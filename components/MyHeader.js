export default function MyHeader() {
    return (
        <header className="relative z-20 bg-transparent">
            <div className="container relative flex flex-col items-center justify-between px-6 py-8 mx-auto">
                <div className="flex flex-col">
                    <h1 className="w-full text-4xl font-light text-center text-gray-800 uppercase sm:text-5xl dark:text-white">
                        Découvrez la répartition de la population française
                    </h1>
                    <h2 className="w-full max-w-2xl py-8 mx-auto text-xl font-light text-center text-gray-500 dark:text-white">
                        Vous pouvez choisir de sélectionner globalement par régions ou par départements, pour plus de précision, vous pouvez également choisir de filtrer par Commune
                    </h2>
                    <h2 className="w-full max-w-2xl mx-auto text-xl font-light text-center text-gray-500 dark:text-white">
                        Rien de plus simple, définissez le curseur sur votre choix.
                    </h2>
                </div>
                <div className="relative block w-full mx-auto mt-6 md:mt-0">
                    <img
                        src="/images/logo_bg_free.png"
                        className="w-32 h-32 mx-auto mt-4 rounded-full object-cover"
                        alt="Logo"
                    />
                </div>
            </div>
        </header>
    )
}