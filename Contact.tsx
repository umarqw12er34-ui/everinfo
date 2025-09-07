import React, { useState, ChangeEvent, FormEvent } from 'react';
import { MapPin, Phone, MessageSquare, Send, Clock, Users } from 'lucide-react';

const TELEGRAM_USERNAME = 'EVEREST_MANAGER';
const MAP_LINK = 'https://maps.app.goo.gl/xe1gEcak8vR48bsb8';
const CONTACT_PHONE = '+998941580711';

const contactInfo = [
	{
		title: 'Manzil',
		details: "Buloqboshi tumani markazi, Yoshlar bog'i ro'parasida",
		icon: <MapPin className="h-5 w-5 text-white" />,
		color: 'from-blue-500 to-indigo-600',
	},
	{
		title: 'Telefon',
		details: CONTACT_PHONE,
		icon: <Phone className="h-5 w-5 text-white" />,
		color: 'from-green-500 to-teal-500',
	},
	{
		title: 'Telegram',
		details: `@${TELEGRAM_USERNAME}`,
		icon: <MessageSquare className="h-5 w-5 text-white" />,
		color: 'from-pink-500 to-rose-500',
	},
];

const Contact = () => {
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		course: '',
		message: '',
	});

	const workingHours = [
		{ day: 'Dushanba - Shanba', time: '09:00 - 18:00' },
		{ day: 'Yakshanba', time: 'Dam olish' },
	];

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const text = `Ism: ${formData.name}\nTelefon: ${formData.phone}\nKurs: ${formData.course}\nXabar: ${formData.message}`;
		const url = `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(text)}`;
		window.open(url, '_blank', 'noopener,noreferrer');
		setFormData({ name: '', phone: '', course: '', message: '' });
		// small UX feedback
		try {
			alert(
				'Sizning xabaringiz yuborildi. Telegram orqali tez orada bog\'lanamiz.'
			);
		} catch {}
	};

	return (
		<section
			id="contact"
			className="py-16 md:py-20 bg-gradient-to-b from-blue-50 to-gray"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
						📞 Biz Bilan Bog'laning
					</h2>
					<p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
						Savollaringiz bormi? Bepul darsga yozilmoqchimisiz? Biz bilan
						bog'laning!
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
					{/* Contact Information */}
					<div className="lg:col-span-1 px-4 lg:px-0">
						<h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
							📋 Aloqa Ma'lumotlari
						</h3>

						<div className="space-y-6 mb-8">
							{contactInfo.map((info, index) => (
								<div key={index} className="flex items-start space-x-4">
									<div
										className={`p-2 md:p-3 bg-gradient-to-r ${info.color} rounded-lg flex items-center justify-center`}
									>
										<div className="text-sky-500">{info.icon}</div>
									</div>
									<div>
										<h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">
											{info.title}
										</h4>
										{Array.isArray(info.details) ? (
											<div className="space-y-1">
												{(info.details as string[]).map((detail, idx) => (
													<p
														key={idx}
														className="text-gray-600 text-sm md:text-base"
													>
														{detail}
													</p>
												))}
											</div>
										) : (
											<p className="text-gray-600 text-sm md:text-base">
												{info.title === 'Manzil' ? (
													<a
														href={MAP_LINK}
														target="_blank"
														rel="noopener noreferrer"
														className="underline hover:text-indigo-600"
													>
														{info.details}
													</a>
												) : info.title === 'Telegram' ? (
													<a
														href={`https://t.me/${TELEGRAM_USERNAME}`}
														target="_blank"
														rel="noopener noreferrer"
														className="underline hover:text-indigo-600"
													>
														{info.details}
													</a>
												) : info.title === 'Telefon' ? (
													<a
														href={`tel:${CONTACT_PHONE}`}
														className="underline hover:text-indigo-600"
													>
														{info.details}
													</a>
												) : (
													<>{info.details}</>
												)}
											</p>
										)}
									</div>
								</div>
							))}
						</div>

						{/* Working Hours */}
						<div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
							<h4 className="font-semibold text-gray-900 mb-4 flex items-center text-sm md:text-base">
								<Clock className="h-5 w-5 text-blue-600 mr-2" />
								⏰ Ish Vaqtlari
							</h4>
							<div className="space-y-3">
								{workingHours.map((schedule, index) => (
									<div
										key={index}
										className="flex justify-between items-center"
									>
										<span className="text-gray-600 text-sm md:text-base">
											{schedule.day}
										</span>
										<span className="font-semibold text-gray-900 text-sm md:text-base">
											{schedule.time}
										</span>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Contact Form */}
					<div className="lg:col-span-2 px-4 lg:px-0">
						<div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
							<h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center">
								<Users className="h-6 w-6 text-blue-600 mr-2" />
								🆓 Bepul Darsga Yoziling
							</h3>

							<form onSubmit={handleSubmit} className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
									<div>
										<label
											htmlFor="name"
											className="block text-sm font-medium text-gray-700 mb-2"
										>
											👤 To'liq Ismingiz
										</label>
										<input
											type="text"
											id="name"
											name="name"
											value={formData.name}
											onChange={handleChange}
											required
											className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm md:text-base"
											placeholder="Ismingizni kiriting"
										/>
									</div>

									<div>
										<label
											htmlFor="phone"
											className="block text-sm font-medium text-gray-700 mb-2"
										>
											📱 Telefon Raqamingiz
										</label>
										<input
											type="tel"
											id="phone"
											name="phone"
											value={formData.phone}
											onChange={handleChange}
											required
											className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm md:text-base"
											placeholder="+998 XX XXX XX XX"
										/>
									</div>
								</div>

								<div>
									<label
										htmlFor="course"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										📚 Qaysi Kursga Qiziqasiz?
									</label>
									<select
										id="course"
										name="course"
										value={formData.course}
										onChange={handleChange}
										required
										className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm md:text-base"
									>
										<option value="">Kursni tanlang</option>
										<option value="matematika-fizika">
											Matematika va Fizika
										</option>
										<option value="turk-tili">Turk Tili</option>
										<option value="ona-tili">
											Ona Tili va Adabiyot
										</option>
										<option value="smart-coin">Smart Coin haqida</option>
									</select>
								</div>

								<div>
									<label
										htmlFor="message"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										💬 Qo'shimcha Xabar
									</label>
									<textarea
										id="message"
										name="message"
										value={formData.message}
										onChange={handleChange}
										rows={4}
										className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm md:text-base"
										placeholder="Savollaringizni yozing..."
									></textarea>
								</div>

								<button
									type="submit"
									className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 md:py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 text-sm md:text-base"
								>
									<Send className="h-5 w-5" />
									<span>📤 Yuborish</span>
								</button>
							</form>
						</div>
					</div>
				</div>

				{/* Map */}
				<div className="bg-white rounded-2xl shadow-lg overflow-hidden mx-4">
					<a
						href={MAP_LINK}
						target="_blank"
						rel="noopener noreferrer"
						className="block"
					>
						<div className="h-64 bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center hover:opacity-95 transition">
							<div className="text-center px-6">
								<MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
								<h4 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
									🗺️ Bizning Joylashuvimiz
								</h4>
								<p className="text-gray-600 text-sm md:text-base px-4 underline hover:text-indigo-600">
									Xaritada ko'rish uchun bosing
								</p>
							</div>
						</div>
					</a>
				</div>
			</div>
		</section>
	);
};

export default Contact;