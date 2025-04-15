import Image from 'next/image';

const HeroImage = () => {
    return (
        <div className="w-full max-w-7xl mx-auto px-8 py-16">
            <div className="relative w-full h-[500px] bg-gray-100">
                <Image
                    src="https://i.postimg.cc/Z5BFndtZ/Surf-Photo.jpg"
                    alt="Surfing photo"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
        </div>
    );
};

export default HeroImage; 