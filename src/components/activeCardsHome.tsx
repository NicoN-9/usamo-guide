import { AcademicCapIcon, ChartBarIcon, ChevronRightIcon, ClockIcon, CogIcon, TerminalIcon, UserGroupIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarCheck } from 'lucide-react';
import ContestWidget from './ContestWidget';

const headerClasses =
  'text-4xl md:text-5xl 2xl:text-6xl font-black text-gray-900 dark:text-white';
const subtextClasses =
  'text-lg md:text-xl 2xl:text-2xl font-medium max-w-4xl leading-relaxed text-gray-700 dark:text-orange-100/80';

const projects = [
  {
    title: "Weekly Mock Contests",
    icon: CalendarCheck,
    color: "from-fuchsia-500 to-purple-600",
    desc: "Join guided sessions focused on problem solving, solution writing, and proof critique. Led by top performers to help you master competition-level rigor.",
    url: "https://contests.usamoguide.com/",
    widget: <ContestWidget/>
  },
  {
    title: "Study Groups",
    icon: UserGroupIcon, // Swapped to UserGroup for better context
    color: "from-green-400 to-cyan-500",
    desc: "A custom-built learning management system designed specifically for math clubs, classes, and competitive teams to track progress together. (Coming Soon!)",
    url: "/groups"
  },
  {
    title: "Mentorship",
    icon: CogIcon,
    color: "from-yellow-400 to-orange-500",
    desc: "Get paired with experienced mentors for direct feedback on your solutions, personalized study plans, and guidance through the contest circuit. (Coming Soon!)",
    url: "/groups"
  }
];

const ActiveCardsHome = () => {
    const [activeCard, setActiveCard] = useState(0);

  return (
    <div className="relative overflow-x-hidden bg-gradient-to-b from-orange-50 via-amber-50 to-white transition-colors duration-500 dark:bg-[linear-gradient(to_bottom,#2d170c_0%,#26170d_18%,#21150e_48%,#1b140f_100%)]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-[#3a1d10]/60 via-[#2d170c]/35 to-transparent blur-3xl dark:block" />
          <div className="h-16 md:h-20 2xl:h-36"></div>
            <div className="px-4 sm:px-6 lg:px-8 2xl:px-16">
              <h2 className={classNames(headerClasses, 'md:text-center')}>
                Built by the USAMO Guide community.
              </h2>
              <div className="h-2 md:h-8"></div>
              <p className={classNames(subtextClasses, 'mx-auto md:text-center')}>
                Here are a few resources and study tools that pair well with the
                guide.
              </p>

              <div className="2xl:24 h-12 md:h-16"></div>

            <div className='flex flex-col gap-4 md:flex-row items-start overflow-x-hidden'>
              <div className="flex flex-col w-full md:w-2/6 flex-shrink-0">
                {projects.map((project,id)=> (
                <div key={id} onClick={()=> setActiveCard(id)} className={classNames('group relative cursor-pointer border transition-all duration-300 p-1',
                  "border-x border-t border-orange-200/70 dark:border-white/10",
                        id===0? "rounded-t-2xl":"",
                  id===projects.length-1 ? "border-b rounded-b-2xl": "border-b-0",
                        activeCard ===id 
                  ? "border-orange-400/60 bg-white shadow-[0_0_20px_rgba(251,146,60,0.1)] dark:border-orange-400/50 dark:bg-white/10" 
                  : "border-orange-200/60 bg-white/70 hover:border-orange-300/80 dark:border-white/5 dark:bg-transparent dark:hover:border-white/[0.03]"
                    )}>
                        {activeCard===id && (
                    <div className='absolute left-0 top-2 bottom-2 w-1 bg-orange-500 rounded-full'/>
                        )}
                        <div className='p-4 flex items-center justify-between'>
                            <div className='flex items-center gap-4'>
                                <div className={classNames("p-2 rounded-lg", project.color)}>
                                    <project.icon className='size-6'/>
                                </div>
                                <span className='text-lg font-bold text-gray-900 dark:text-white'>{project.title}</span>
                            </div>
                            <ChevronRightIcon
                                className={classNames('h-5 w-5 text-gray-400 transition-transform duration-300 dark:text-white/30',
                                  activeCard===id?"rotate-90 text-orange-500 dark:text-orange-400": ''
                                )}
                            />
                        </div>
                        <AnimatePresence>
                            {activeCard === id && (
                                <motion.div
                                    initial={{height:0, opacity:0}}
                                    animate={{height:'auto', opacity:1}}
                                    exit={{height:0, opacity:0}}
                                    className="overflow-hidden"
                                >
                                    <p className='line-clamp-3 px-6 pb-6 text-sm leading-relaxed text-orange-900/80 dark:text-orange-100/60'>
                                        {project.desc}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </div>
                ))}
              </div>
              <div className="hidden md:block relative flex-grow min-w-0">

                <div className="sticky top-24 h-fit min-h-[600px]">
                <div className={classNames(
                    "relative h-full w-full max-w-full", 
                    "overflow-hidden rounded-3xl border border-gray-200 bg-white/50 p-12 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5 md:p-10"
                )}>
                    
                    <div className="max-w-2xl relative z-10">
                    <div className={classNames("inline-block rounded-xl my-4 shadow-2xl from-orange-300 to-orange-700")}>
                            {React.createElement(projects[activeCard].icon, { className: "w-8 h-8 text-white" })}
                        
                    </div>
                    
                    <h3 className="text-4xl font-extrabold tracking-tighter leading-none text-gray-900 dark:text-white">
                        {projects[activeCard].title}
                    </h3>
                    
                    <div className="h-1 w-20 bg-orange-500/30 my-4 rounded-full" />
                    
                    <p className="w-full text-xl font-medium text-gray-700 dark:text-orange-50/70">
                        {projects[activeCard].desc}
                    </p>

                    <div className="flex-grow flex items-center justify-center py-10">
                        <div className="w-full">
                        {projects[activeCard].widget}
                        </div>
                    </div>

                    </div>

                    {/* Deep Ambient Glow in the bottom right of the panel */}
                    <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-orange-600/10 blur-[100px] rounded-full pointer-events-none" />
                </div>
                </div>
              </div>
            </div>

        </div>
        <div className="h-16 md:h-36"></div>
    </div>
  )
}

export default ActiveCardsHome