export default function CardLandingPage({info}){

    const {img, title, description} = info;

    return <div className="flex w-52 flex-col items-center">
            <img className="mb-3 mt-10 h-24" src={img} alt="not ofund" />
            <div className="mb-3 font-semibold text-4xl text-center text-mine-shaft-600 dark:text-mine-shaft-400">{title}</div>
            <div className="text-lg pb-6 text-mine-shaft-600 dark:text-mine-shaft-200 text-center">{description}</div>
    </div>
}