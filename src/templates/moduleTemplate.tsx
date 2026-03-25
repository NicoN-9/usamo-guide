import { graphql, navigate } from 'gatsby';
import * as React from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { SECTION_LABELS } from '../../content/ordering';
import { ContentAccessModal } from '../components/ContentAccessModal';
import Layout from '../components/layout';
import Markdown from '../components/markdown/Markdown';
import MarkdownLayout from '../components/MarkdownLayout/MarkdownLayout';
import SEO from '../components/seo';
import { ConfettiProvider } from '../context/ConfettiContext';
import { MarkdownProblemListsProvider } from '../context/MarkdownProblemListsContext';
import {
  useCurrentUser,
  useIsUserDataLoaded,
} from '../context/UserDataContext/UserDataContext';
import { graphqlToModuleInfo } from '../utils/utils';

export default function Template(props): JSX.Element {
  const { xdm, moduleProblemLists } = props.data; // data.markdownRemark holds your post data
  const { body } = xdm;
  const module = React.useMemo(() => graphqlToModuleInfo(xdm), [xdm]);
  const isLoaded = useIsUserDataLoaded();
  const currentUser = useCurrentUser();
  const [isAccessModalDismissed, setIsAccessModalDismissed] = React.useState(false);
  const isContentLocked = !currentUser;
  const showContentAccessModal = isLoaded && isContentLocked && !isAccessModalDismissed;

  useEffect(() => {
    // source: https://miguelpiedrafita.com/snippets/scrollToHash
    const { hash } = location;
    if (!hash) return;
    if (!isLoaded) return;
    window.requestAnimationFrame(() => {
      try {
        const anchor = document.getElementById(hash.substring(1));
        if (!anchor) throw new Error(`The anchor "${hash}" doesn't exist`);
        const offset = anchor.getBoundingClientRect().top + window.scrollY;
        window.scroll({ top: offset, left: 0 });
      } catch (e) {
        console.error(e);
      }
    });
  }, [isLoaded]);

  return (
    <Layout setLastViewedModule={module.id}>
      <SEO
        title={`${module.title}`}
        description={module.description}
        image={null}
        pathname={props.path}
      />
      <Helmet>
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://usamo.guide/"
            },{
              "@type": "ListItem",
              "position": 2,
              "name": "${SECTION_LABELS[module.section]}",
              "item": "https://usamo.guide/${module.section}"
            },{
              "@type": "ListItem",
              "position": 3,
              "name": "${module.title}",
              "item": "https://usamo.guide/${module.section}/${module.id}"
            }]
          }
        `}</script>
      </Helmet>

      <div className="relative overflow-hidden bg-gradient-to-b from-orange-50 via-amber-50 to-white dark:from-[#140f0a] dark:via-[#1a1004] dark:to-[#0f172a]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18] [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_75%)]"
          style={{ backgroundImage: "url('/images/math-doodles.png')" }}
        />
        <div className="pointer-events-none absolute inset-0">
          <svg className="h-full w-full opacity-[0.12] dark:opacity-[0.2]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="module-grid-pattern" width="50" height="50" patternUnits="userSpaceOnUse">
                <path
                  d="M 50 0 L 0 0 0 50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-orange-400/60 dark:text-orange-500/80"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#module-grid-pattern)" />
          </svg>
        </div>

        <div className={isContentLocked ? 'pointer-events-none select-none blur-[4px]' : ''}>
          <ConfettiProvider>
            <MarkdownProblemListsProvider
              value={moduleProblemLists?.problemLists || []}
            >
              <MarkdownLayout markdownData={module}>
                <div className="py-4">
                  <Markdown body={body} />
                </div>
              </MarkdownLayout>
            </MarkdownProblemListsProvider>
          </ConfettiProvider>
        </div>
      </div>

      <ContentAccessModal
        isOpen={showContentAccessModal}
        sectionLabel={SECTION_LABELS[module.section]}
        onClose={() => {
          setIsAccessModalDismissed(true);
          navigate(`/${module.section}`);
        }}
      />
    </Layout>
  );
}

export const pageQuery = graphql`
  query ($id: String!) {
    xdm(frontmatter: { id: { eq: $id } }) {
      body
      frontmatter {
        title
        author
        contributors
        id
        prerequisites
        description
        frequency
      }
      parent {
        ... on File {
          name
          relativePath
        }
      }
      fields {
        division
        gitAuthorTime
      }
      toc {
        cpp {
          depth
          value
          slug
        }
        java {
          depth
          value
          slug
        }
        py {
          depth
          value
          slug
        }
      }
    }
    moduleProblemLists(moduleId: { eq: $id }) {
      problemLists {
        listId
        problems {
          uniqueId
          name
          url
          source
          sourceDescription
          difficulty
          isStarred
          tags
          statement
          author
          interaction {
            type
            correct
            choices
            correctIndex
          }
          solutionReveal {
            mode
            url
            markdown
          }
          solution {
            kind
            label
            labelTooltip
            url
            hasHints
            sketch
          }
        }
      }
    }
  }
`;
