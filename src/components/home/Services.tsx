import { Scale, Handshake, Landmark, Gavel } from 'lucide-react';

const services = [
    {
        icon: <Scale className="w-12 h-12 text-[#A07D5A] mb-4" />,
        title: "Civil Matters",
        description: "Resolution for civil disputes and related legal challenges."
    },
    {
        icon: <Handshake className="w-12 h-12 text-[#A07D5A] mb-4" />,
        title: "Corporate Affairs",
        description: "Legal advice for businesses, startups, and enterprises."
    },
    {
        icon: <Landmark className="w-12 h-12 text-[#A07D5A] mb-4" />,
        title: "Administrative",
        description: "Regulatory and agency matters handled with expertise."
    },
    {
        icon: <Gavel className="w-12 h-12 text-[#A07D5A] mb-4" />,
        title: "Criminal Defense",
        description: "Strategic defense against criminal charges at all levels."
    }
];

const Services = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-12">Selected Services</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center text-center">
                            {service.icon}
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                            <p className="text-gray-600">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
