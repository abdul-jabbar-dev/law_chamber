import Link from 'next/link';
import { Scale, Gavel, Home, Users, Banknote, FileText, Scroll, Globe, FileSignature, Receipt } from 'lucide-react';

const services = [
    {
        icon: <Scale className="w-12 h-12 text-[#A07D5A] mb-4" />,
        title: "Civil Matters",
        description: "Resolution for civil disputes and related legal challenges."
    },
    {
        icon: <Gavel className="w-12 h-12 text-[#A07D5A] mb-4" />,
        title: "Criminal Defense",
        description: "Strategic defense against criminal charges at all levels."
    },
    {
        icon: <Home className="w-12 h-12 text-[#A07D5A] mb-4" />,
        title: "Landlord & Tenant",
        description: "Legal support for property leasing and tenant disputes."
    },
    {
        icon: <Users className="w-12 h-12 text-[#A07D5A] mb-4" />,
        title: "Family Laws & Divorce",
        description: "Compassionate counsel for family legal matters and divorce."
    },
    {
        icon: <Banknote className="w-12 h-12 text-[#A07D5A] mb-4" />,
        title: "Cheque & Money Claims",
        description: "Efficient recovery and resolution of financial disputes."
    },
    {
        icon: <FileText className="w-12 h-12 text-[#A07D5A] mb-4" />,
        title: "Succession",
        description: "Guidance on property inheritance and succession planning."
    },
    {
        icon: <Scroll className="w-12 h-12 text-[#A07D5A] mb-4" />,
        title: "Will & Probate",
        description: "Drafting wills and navigating the probate process seamlessly."
    },
    {
        icon: <Globe className="w-12 h-12 text-[#A07D5A] mb-4" />,
        title: "Human Rights",
        description: "Advocacy and protection of fundamental human rights."
    },
    {
        icon: <FileSignature className="w-12 h-12 text-[#A07D5A] mb-4" />,
        title: "Writ",
        description: "Filing and arguing writ petitions in higher courts."
    },
    {
        icon: <Receipt className="w-12 h-12 text-[#A07D5A] mb-4" />,
        title: "Income Tax on service",
        description: "Expert advice on income tax compliance and planning."
    }
];

const Services = () => {
    const displayedServices = services.slice(0, 4);

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 text-center md:text-left">
                    <h2 className="text-4xl font-bold text-gray-900">Selected Services</h2>
                    <Link href="/practice-areas" className="mt-4 md:mt-0 text-[#A07D5A] hover:text-[#866645] font-semibold flex items-center gap-2 transition-colors">
                        More Service <span>&rarr;</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {displayedServices.map((service, index) => (
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
