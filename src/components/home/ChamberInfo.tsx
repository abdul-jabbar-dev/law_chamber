import { MapPin, Clock, CalendarDays } from 'lucide-react';

const ChamberInfo = () => {
    return (
        <section className="py-20 bg-gray-50 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-wide uppercase font-serif">
                        Chamber <span className="text-[#A07D5A]">Information</span>
                    </h2>
                    <div className="w-24 h-0.5 bg-[#A07D5A] mx-auto mb-6"></div>
                    <p className="max-w-2xl mx-auto text-sm md:text-base text-gray-600 font-sans leading-relaxed">
                        Find our location, check our availability, and schedule your appointment with our expert legal team.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Location */}
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                        <div className="w-16 h-16 bg-[#A07D5A]/10 rounded-full flex items-center justify-center mb-6 text-[#A07D5A]">
                            <MapPin className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 font-serif uppercase tracking-wider">Location</h3>
                        <p className="text-gray-600 font-sans text-sm leading-relaxed">
                            123 Legal Avenue, Suite 400<br />
                            Downtown Business District<br />
                            Dhaka 1000, Bangladesh
                        </p>
                    </div>

                    {/* Appointment Time */}
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                        <div className="w-16 h-16 bg-[#A07D5A]/10 rounded-full flex items-center justify-center mb-6 text-[#A07D5A]">
                            <Clock className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 font-serif uppercase tracking-wider">Appointment Time</h3>
                        <div className="text-gray-600 font-sans text-sm leading-relaxed space-y-1 w-full">
                            <div className="flex justify-between border-b border-gray-100 pb-1">
                                <span className="font-semibold text-gray-800">Morning:</span>
                                <span>10:00 AM - 1:00 PM</span>
                            </div>
                            <div className="flex justify-between pt-1">
                                <span className="font-semibold text-gray-800">Evening:</span>
                                <span>5:00 PM - 8:30 PM</span>
                            </div>
                        </div>
                    </div>

                    {/* Working Days */}
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                        <div className="w-16 h-16 bg-[#A07D5A]/10 rounded-full flex items-center justify-center mb-6 text-[#A07D5A]">
                            <CalendarDays className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 font-serif uppercase tracking-wider">Working Days</h3>
                        <p className="text-gray-600 font-sans text-sm leading-relaxed">
                            <span className="font-bold text-gray-800">Saturday to Thursday</span><br />
                            <span className="text-xs font-semibold text-[#A07D5A] uppercase tracking-wide mt-2 block border-t border-gray-100 pt-2">
                                Closed on Fridays & Public Holidays
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChamberInfo;
