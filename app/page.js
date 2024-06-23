export default function index() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-indigo-900">
            <img src="/images/logo_bg_free.png" className="absolute inset-0 object-cover w-full h-full" />
            <div className="absolute inset-0 bg-black opacity-25">
            </div>

            <div className="container relative z-10 flex items-center w-full max-w-4xl py-16 mx-auto my-24 border-4 border-white rounded-lg md:my-32">
                <div className="relative z-10 flex flex-col items-center justify-between w-full">
                    <p className="flex flex-col items-center text-6xl font-extrabold text-center text-white md:text-8xl">
                        Découvrez la population française
                    </p>
                    <p className="flex flex-col items-center max-w-lg mt-6 text-lg font-extrabold text-center text-white">
                        Ce projet vous permettra de découvrir la répartition de la population française selon vos propres critères de sélection. Les chiffres exploités ici, sont les chiffres officiels du recensement légal au 1er Janvier 2022, sur la base du recensement de la population réalisé par l'INSEE en 2019
                    </p>
                    <a href="/carte" className="block px-4 py-3 mt-10 text-lg font-bold text-white uppercase bg-gray-800 hover:bg-gray-900">
                        Commencer
                    </a>
                </div>
            </div>
        </div>
    )
}