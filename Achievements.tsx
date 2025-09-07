import React, { useEffect, useState } from "react";
import { Plus, Lock, X, UploadCloud } from "lucide-react";
import supabase from "../lib/supabaseClient";

type Achievement = {
  id: string;
  title: string;
  image_url?: string | null;
  created_at?: string;
};

const ADMIN_PASSWORD = "2222jjjj";

const Achievements: React.FC = () => {
  const [items, setItems] = useState<Achievement[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // showAll controls whether all items are visible or only the latest two
  const [showAll, setShowAll] = useState(false);

  // pendingDeleteId indicates a protected delete in progress (string id)
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchAchievements();
  }, []);

  // return normalized rows so callers can poll/check immediately after upload
  async function fetchAchievements(): Promise<Achievement[]> {
    try {
      console.log("[Achievements] fetching...");
      const { data, error } = await supabase
        .from<Achievement>("achievements")
        .select("*")
        .order("created_at", { ascending: false });

      console.log("[Achievements] query result:", { data, error });
      if (error) {
        console.error("[Achievements] select error:", error);
        return [];
      }

      const supaUrl = (import.meta.env.VITE_SUPABASE_URL as string) || "";

      const normalized = (data ?? []).map((row) => {
        let url = row.image_url ?? null;

        if (url) {
          if (/^https?:\/\//i.test(url)) {
            // already a full URL — use as-is
          } else {
            // value from DB is a storage path (e.g. "filename.jpg" or "folder/filename.jpg"
            // or mistakenly "achievements/filename.jpg"). Normalize so we don't double-prefix.
            let pathInBucket = url.startsWith("/") ? url.slice(1) : url;
            // remove an extra leading "achievements/" if present (so manual URL won't contain double segment)
            pathInBucket = pathInBucket.replace(/^achievements\//, "");

            try {
              const res = supabase.storage.from("achievements").getPublicUrl(pathInBucket);
              const publicUrl = (res as any)?.data?.publicUrl || (res as any)?.data?.publicURL || null;
              if (publicUrl) {
                url = publicUrl;
              } else {
                const path = encodeURIComponent(pathInBucket).replace(/%2F/g, "/");
                url = `${supaUrl.replace(/\/$/, "")}/storage/v1/object/public/achievements/${path}`;
              }
            } catch (e) {
              console.warn("[Achievements] getPublicUrl failed, building manual URL", e);
              const path = encodeURIComponent(pathInBucket).replace(/%2F/g, "/");
              url = `${supaUrl.replace(/\/$/, "")}/storage/v1/object/public/achievements/${path}`;
            }
          }
        }

        return { ...row, image_url: url };
      });

      console.log("[Achievements] normalized rows:", normalized);

      // agar DB bo'sh bo'lsa — fallback sifatida berilgan URLni ko'rsatish (tezkor yechim)
      if (!normalized || normalized.length === 0) {
        setItems([
          {
            id: "fallback-1",
            title: "Namuna yutuq",
            image_url:
              "https://gkmgdprolhczdvlmiowa.supabase.co/storage/v1/object/public/achievements/achievements/1757276487268_photo_2025-07-27_21-08-36%20copy.jpg",
            created_at: new Date().toISOString(),
          },
        ]);
      } else {
        setItems(normalized);
      }

      setShowAll(false);
      return normalized;
    } catch (e) {
      console.error("[Achievements] fetch failed", e);
      return [];
    }
  }

  async function uploadAndSave() {
    if (!file || !title.trim()) return alert("Sarlavha va rasm kiriting");

    const titleBefore = title.trim();
    const fd = new FormData();
    fd.append("file", file);
    fd.append("title", titleBefore);

    try {
      // old: const resp = await fetch("http://localhost:3000/upload", { ... })
      const resp = await fetch("/upload", {
        method: "POST",
        body: fd,
      });

      // read raw text first (robust against empty/non-JSON responses)
      const raw = await resp.text();
      let json: any = null;
      try {
        json = raw ? JSON.parse(raw) : null;
      } catch (err) {
        console.warn("[upload] response not JSON:", raw);
      }

      if (!resp.ok) {
        console.error("upload failed", { status: resp.status, raw, json });
        return alert("Upload failed: " + (json?.error || resp.status));
      }

      // success - use json.url if present or fallback to raw text
      const returnedUrl = json?.url ?? raw ?? null;
      console.log("[upload] server returned:", { status: resp.status, raw, json, returnedUrl });

      // clear inputs immediately
      setTitle("");
      setFile(null);

      // Poll fetchAchievements up to ~5 seconds to wait for storage+db visibility
      const maxAttempts = 5;
      const delayMs = 1000;
      let found = false;
      for (let i = 0; i < maxAttempts; i++) {
        const rows = await fetchAchievements();
        if (rows.some((r) => r.title === titleBefore)) {
          found = true;
          break;
        }
        await new Promise((res) => setTimeout(res, delayMs));
      }

      if (!found) {
        // last attempt to refresh UI anyway
        await fetchAchievements();
      }

      alert("Yuklandi");
    } catch (e) {
      console.error("upload error", e);
      alert("Serverga ulanish xatosi. Serverni ishga tushiring va CORS ni tekshiring.");
    }
  }

  async function remove(id: string) {
    if (!confirm("O'chirmoqchimisiz?")) return;
    const { error } = await supabase.from("achievements").delete().eq("id", id);
    if (error) {
      console.error(error);
      alert("O'chirishda xato. Konsolni tekshiring.");
      return;
    }
    fetchAchievements();
  }

  // always require password before adding
  function openAddFlow() {
    setPendingDeleteId(null);
    setPassword("");
    setShowPasswordModal(true);
  }

  // when clicking delete, set pendingDeleteId and show password modal
  function handleDeleteClick(id: string) {
    setPendingDeleteId(id);
    setPassword("");
    setShowPasswordModal(true);
  }

  async function submitPassword(e?: React.FormEvent) {
    e?.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setShowPasswordModal(false);

      if (pendingDeleteId !== null) {
        // perform delete (server) after final confirmation
        if (confirm("Yutuqni o'chirishni tasdiqlaysizmi?")) {
          await remove(pendingDeleteId);
        }
        setPendingDeleteId(null);
        return;
      }

      // correct password for adding -> open add modal
      setShowAddModal(true);
      setPassword("");
    } else {
      alert("Noto'g'ri parol — admin bo'lish uchun to'g'ri parol kerak.");
    }
  }

  // visible items: show all when toggled, otherwise only latest two
  const visibleItems = showAll ? items : items.slice(0, 2);

  return (
    <section id="achievements" className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Bizning yutuqlar</h2>
            <p className="mt-2 text-gray-600 max-w-xl">
              Markazimiz erishgan namunaviy yutuqlar — yangi yutuqlarni admin qo'shishi mumkin.
            </p>
          </div>

          <div>
            <button
              onClick={openAddFlow}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-sky-500 text-white px-4 py-2 rounded-lg shadow hover:scale-[1.02] transition"
            >
              <Plus className="h-4 w-4" />
              Yutuq qo'shish
            </button>
          </div>
        </div>

        {/* Horizontally scrollable achievements gallery */}
        <div className="relative">
          {items.length === 0 ? (
            <div className="py-12 text-center text-gray-500 bg-white rounded-2xl border border-gray-100">
              Hozircha yutuq yo'q — admin tomonidan qo'shing.
            </div>
          ) : (
            <>
              <div
                className="flex gap-6 overflow-x-auto py-4 px-1 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300"
                role="list"
              >
                {visibleItems.map((a) => (
                  <div
                    key={a.id}
                    className="min-w-[260px] flex-shrink-0 snap-start bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                    role="listitem"
                  >
                    {a.image_url ? (
                      <div className="h-36 md:h-44 bg-gray-100 overflow-hidden">
                        <img src={a.image_url} alt={a.title} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="h-36 md:h-44 flex items-center justify-center bg-gradient-to-br from-indigo-50 to-sky-50">
                        <UploadCloud className="h-10 w-10 text-indigo-300" />
                      </div>
                    )}

                    <div className="p-3 md:p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-sm md:text-base font-semibold text-gray-900 line-clamp-2">{a.title}</h3>
                          {a.created_at && (
                            <small className="text-xs text-gray-500">{new Date(a.created_at).toLocaleString()}</small>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDeleteClick(a.id)}
                            className="text-xs text-red-600 px-2 py-1 rounded hover:bg-red-50"
                            title="O'chirish (admin)"
                          >
                            O'chirish
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Toggle button for showing more / less */}
              {items.length > 2 && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setShowAll((s) => !s)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium hover:shadow"
                  >
                    {showAll ? "Kamroq ko'rsatish" : `Ko'proq ko'rsatish (${items.length - 2}+)`}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Password Modal (used for both add and protected delete) */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
            <form onSubmit={submitPassword} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Admin tasdiqlash</h3>
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPendingDeleteId(null);
                  }}
                  className="text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-4">Yutuq qo'shish yoki o'chirish uchun admin parolini kiriting.</p>

              <div className="space-y-3">
                <label className="block text-sm text-gray-700">Parol</label>
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    autoFocus
                  />
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordModal(false);
                      setPendingDeleteId(null);
                    }}
                    className="px-4 py-2 rounded-md text-sm bg-gray-100"
                  >
                    Bekor qilish
                  </button>
                  <button type="submit" className="px-4 py-2 rounded-md text-sm bg-indigo-600 text-white">
                    Tasdiqlash
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Achievement Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                uploadAndSave();
              }}
              className="p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Yangi yutuq qo'shish</h3>
                <button type="button" onClick={() => setShowAddModal(false)} className="text-gray-500">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <label className="text-sm text-gray-700">Yutuq nomi</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                />

                <label className="text-sm text-gray-700">Rasm yuklash (thumb ko'rinishi)</label>
                <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="text-sm" />

                <div className="flex justify-end gap-3 mt-4">
                  <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-md bg-gray-100">
                    Bekor qilish
                  </button>
                  <button type="submit" className="px-4 py-2 rounded-md bg-indigo-600 text-white">
                    Saqlash va qo'shish
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Achievements;