import { Link } from 'gatsby';
import * as React from 'react';
import {
  SECTION_LABELS,
  SECTION_SEO_DESCRIPTION,
  SECTION_SEO_TITLES,
  SectionID,
} from '../../../content/ordering';
import { ModuleFrequency, ModuleLinkInfo } from '../../models/module';
import {
  useModulesProgressInfo,
  useProblemsProgressInfo,
} from '../../utils/getProgressInfo';
import { getModulesForDivision } from '../../utils/utils';
import DashboardProgress, {
  DashboardProgressSmall,
} from '../Dashboard/DashboardProgress';
import Layout from '../layout';
import SEO from '../seo';
import ModuleLink from './ModuleLink';
import TopNavigationBar from '../TopNavigationBar/TopNavigationBar';

const HeroAccentColor: { [key in SectionID]: string } = {
  foundations: 'from-sky-500 to-orange-500',
  intermediate: 'from-orange-500 to-sky-500',
  advanced: 'from-sky-500 to-orange-500',
  usamo: 'from-orange-500 to-sky-500',
};

const SECTION_DESCRIPTION: { [key in SectionID]: React.ReactNode } = {
  foundations: (
    <>
      Build your core toolbox first: algebra, geometry, counting, and number
      theory fundamentals that show up across AMC and early AIME problems.
      <br />
      Focus on understanding patterns and writing clean solutions before moving
      on.
    </>
  ),
  intermediate: (
    <>
      Strengthen problem-solving depth with multi-step AIME-style techniques,
      including functional equations, inequalities, advanced counting, and
      richer geometry.
      <br />
      This stage is about speed plus rigor: solve accurately under time
      pressure.
    </>
  ),
  advanced: (
    <>
      Tackle olympiad-level ideas and harder AIME/USAMO crossover topics such
      as advanced number theory, geometry transformations, and deep algebraic
      methods.
      <br />
      Expect longer chains of reasoning and proof-oriented structure.
    </>
  ),
  usamo: (
    <>
      Prepare specifically for proof-based olympiad rounds with guided practice
      in construction, invariants, and elegant argument design.
      <br />
      Emphasis is on clarity, correctness, and full-solution communication.
    </>
  ),
};

type SyllabusPageProps = {
  data: Queries.SyllabusQuery;
  division: SectionID;
  path: string;
};

export default function SyllabusPage({
  data,
  division,
  path,
}: SyllabusPageProps) {
  const allModules = data.modules.nodes.reduce(
    (acc, cur) => {
      acc[cur.frontmatter.id] = cur;
      return acc;
    },
    {} as { [key: string]: (typeof data.modules.nodes)[0] }
  );

  const section = getModulesForDivision(allModules, division);

  const moduleIDs = section.reduce((acc, cur) => {
    const ids = cur.items
      .filter((x): x is NonNullable<typeof x> => Boolean(x))
      .map(x => x.frontmatter.id);
    return [...acc, ...ids];
  }, [] as string[]);
  const moduleProgressInfo = useModulesProgressInfo(moduleIDs);

  const problemIDs = [
    ...new Set(data.problems.nodes.map(x => x.uniqueId) as string[]),
  ];
  const problemsProgressInfo = useProblemsProgressInfo(problemIDs);

  const useProgressBarForCategory = (category: (typeof section)[0]) => {
    const categoryModuleIDs = category.items
      .filter((x): x is NonNullable<typeof x> => Boolean(x))
      .map(module => module.frontmatter.id);
    const categoryProblemIDs = data.problems.nodes
      .filter(x => categoryModuleIDs.includes(x.module?.frontmatter.id ?? ''))
      .map(x => x.uniqueId);
    const categoryProblemsProgressInfo =
      useProblemsProgressInfo(categoryProblemIDs);
    return (
      categoryProblemIDs.length > 1 && (
        <DashboardProgressSmall
          {...categoryProblemsProgressInfo}
          total={categoryProblemIDs.length}
        />
      )
    );
  };

  return (
    <Layout>
      <SEO
        title={SECTION_SEO_TITLES[division]}
        description={SECTION_SEO_DESCRIPTION[division]}
        image={null}
        pathname={path}
      />
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-orange-50 via-blue-50 to-white dark:from-[#1b120a] dark:via-[#0a192f] dark:to-[#0d1321]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_75%)]">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="syllabus-grid-pattern"
                  width="50"
                  height="50"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 50 0 L 0 0 0 50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-orange-300/80 dark:text-sky-400/40"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#syllabus-grid-pattern)" />
            </svg>
          </div>
        </div>

        <TopNavigationBar />

        <main>
          <div className="relative py-12 sm:py-16">
            <div
              className={`absolute inset-x-0 top-0 h-full bg-gradient-to-br ${HeroAccentColor[division]} opacity-90`}
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.2),transparent_35%),radial-gradient(circle_at_20%_80%,rgba(249,115,22,0.2),transparent_35%)]" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="mb-6 text-center text-5xl leading-10 font-black tracking-tight text-white sm:leading-none md:text-6xl">
                {SECTION_LABELS[division]}
              </h1>
              <p className="mx-auto mb-8 max-w-4xl text-center text-orange-50 sm:mb-10">
                {SECTION_DESCRIPTION[division]}
              </p>

              <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/dashboard"
                  className="inline-block rounded-full border-orange-600 bg-linear-to-br from-orange-300 to-orange-500 px-7 py-3 text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(251,146,60,0.45)]"
                >
                  Continue Learning {'>'}
                </Link>
                <a
                  href="https://discord.gg/X2zx6u53XH"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block rounded-full border border-white/60 bg-white/90 px-7 py-3 text-sm font-bold text-slate-900 transition hover:border-orange-200 hover:text-orange-700"
                >
                  Join Community
                </a>
              </div>

              <div className="mx-auto grid max-w-2xl gap-8 lg:max-w-full lg:grid-cols-2">
                <div className="rounded-xl border border-orange-200/60 bg-white/90 shadow-[0_10px_35px_rgba(249,115,22,0.18)] backdrop-blur sm:rounded-2xl dark:border-sky-500/30 dark:bg-[#0f172a]/80">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-semibold text-slate-900 dark:text-slate-100">
                      Modules Progress
                    </h3>
                    <div className="mt-6">
                      <DashboardProgress
                        {...moduleProgressInfo}
                        total={moduleIDs.length}
                      />
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-sky-200/70 bg-white/90 shadow-[0_10px_35px_rgba(14,165,233,0.18)] backdrop-blur sm:rounded-2xl dark:border-orange-500/30 dark:bg-[#0f172a]/80">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-semibold text-slate-900 dark:text-slate-100">
                      Problems Progress
                    </h3>
                    <div className="mt-6">
                      <DashboardProgress
                        {...problemsProgressInfo}
                        total={problemIDs.length}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="syllabus-dotted-line-container relative mx-auto max-w-(--breakpoint-xl) space-y-6 px-4 py-12">
            {section.map(category => (
              <div
                key={category.name}
                className="group/category flex flex-col rounded-2xl border border-orange-100/70 bg-white/70 p-4 shadow-sm transition hover:border-orange-200 md:flex-row dark:border-white/10 dark:bg-white/5"
              >
                <div className="flex-1 pr-12 md:text-right">
                  <h2 className="py-3 text-2xl leading-6 font-semibold text-slate-600 transition group-hover/category:text-slate-900 dark:text-slate-300 dark:group-hover/category:text-slate-100">
                    {category.name}
                  </h2>
                  <div className="py-3 leading-6 text-slate-500 transition group-hover/category:text-slate-800 dark:text-slate-400 dark:group-hover/category:text-slate-200">
                    {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
                    {useProgressBarForCategory(category)}
                  </div>
                  <p className="text-slate-500 transition group-hover/category:text-slate-700 md:ml-auto md:max-w-sm dark:text-slate-400 dark:group-hover/category:text-slate-200">
                    {category.description}
                  </p>
                </div>
                <div className="flex-1 pl-12">
                  {category.items
                    .filter((x): x is NonNullable<typeof x> => Boolean(x))
                    .map(item => (
                    <ModuleLink
                      key={item.frontmatter.id}
                      link={
                        new ModuleLinkInfo(
                          item.frontmatter.id,
                          division,
                          item.frontmatter.title,
                          item.frontmatter.description,
                          item.frontmatter.frequency as ModuleFrequency,
                          item.isIncomplete,
                          [],
                          item.fields?.gitAuthorTime
                        )
                      }
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
}
