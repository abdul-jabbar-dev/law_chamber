const stats = [
    { value: "1000+", label: "Cases Resolved" },
    { value: "20+", label: "Years Experience" },
    { value: "50+", label: "Professional Lawyers" },
    { value: "95%", label: "Client Satisfaction Rate" }
];

const Stats = () => {
    return (
        <section className="py-16 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                            <p className="text-gray-600 font-medium text-center">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
