/**
 * @copyright 2024 Matthew Li
 * @license Apache-2.0
 */

/* Node modules */
import PropTypes from "prop-types"


const ExperienceCard = ({
    content,
    title,
    imgSrc,
    company
}) => {
  return (
    <div className="ring-2 ring-inset ring-zinc-50/10 rounded-2xl p-5 hover:bg-zinc-800 transition-colors min-w-[320px] flex flex-col lg:min-w-[420px] 
    mb-8 reveal-up ">

        <div className="flex items-center gap-1 mb-3">
        </div>



        <div className="flex items-center gap-2 mt-auto">
            <figure className="rounded-lg">
                <img 
                src={`${import.meta.env.BASE_URL}${imgSrc}`}
                alt={title}
                width={56}
                height={56}
                loading='lazy'
                className="" 
                />
            </figure>
            <div className=" text-zinc-200 tracking-wider ml-2">
                <p>{title}</p>
                <p>{company}</p>
            </div>
        </div>
        <p className="text-zinc-400 mb-3 mt-8">
            {content}
        </p>

    </div>
  )
}

ExperienceCard.propTypes = {
    content: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired
}

export default ExperienceCard