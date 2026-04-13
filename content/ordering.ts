// Section -> Chapter -> Module

export type SectionID =
  | 'foundations'
  | 'intermediate'
  | 'advanced'
  | 'usamo';

export type Chapter = {
  name: string;
  items: string[];
  description?: string;
};

const MODULE_ORDERING: { [key in SectionID]: Chapter[] } = {
  foundations: [
    {
      name: 'Arithmetic',
      description: 'Speed, mental math, and fluency with core numerical operations.',
      items: [
        'fraction-decimal-percent',
        'proportional-reasoning',
        'kinematics-rates',
        'estimation-bounding',
        'absolute-value-integers',
      ],
    },
    {
      name: 'Data',
      description: 'Interpreting data, central tendency, and organizing information visually.',
      items: [
        'mean-median-mode-harmonic',
        'chart-graph-interpretation',
        'venn-diagrams-sets',
      ],
    },
    {
      name: 'Algebra',
      description: 'Translating problems into equations, solving systems, and pattern recognition.',
      items: [
        'word-problem-translation',
        'linear-equations-inequalities',
        'systems-equations',
        'defined-operations',
        'arithmetic-sequences',
        'exponent-rules',
        'polynomial-factoring-identities',
        'extremal-principle',
      ],
    },
    {
      name: 'Geometry',
      description: 'Angles, triangles, circles, and spatial reasoning for contest problems.',
      items: [
        'angle-chasing-parallel-lines',
        'triangle-fundamentals',
        'right-triangles',
        'triangle-congruence-similarity',
        'special-quadrilaterals',
        'circle-angles',
        'composite-figures-shaded-areas',
        'coordinate-geometry-basics',
      ],
    },
    {
      name: 'Number Theory',
      description: 'Primes, divisibility, modular arithmetic, and integer properties.',
      items: [
        'primes-and-composites',
        'prime-factorization',
        'divisibility-rules',
        'gcd-and-lcm',
        'divisor-counting-formulas',
        'modular-arithmetic-intro',
        'units-digit-periodicity',
        'base-number-systems',
      ],
    },
    {
      name: 'Combinatorics & Probability',
      description: 'Counting techniques, probability fundamentals, and strategic enumeration.',
      items: [
        'counting-fundamentals',
        'permutations-combinations',
        'systematic-casework',
        'complementary-counting',
        'intro-probability',
        'geometric-probability-intro',
        'inclusion-exclusion',
        'stars-and-bars',
      ],
    },
    {
      name: 'Old Content',
      description: 'Archived modules from the previous curriculum. These topics may be integrated into updated modules in the future.',
      items: [
        'arithmetic-nt-basics',
        'linear-diophantine-equations',
        'chicken-mcnugget',
        'algebra-basics',
        'quadratic-identities',
        'quadratic-formula',
        'substitution-techniques',
        'sfft-factoring',
        'cubic-factorizations',
        'vieta-formulas',
        'polynomial-manipulations',
        'geometric-sequences',
        'telescoping',
        'amgm-inequality',
        'cauchy-schwarz',
        'inequalities-foundations',
        'pascals-triangle-binomial-theorem',
        'pigeonhole-principles',
        'geometry-basics',
        'triangle-angle-sum',
        'triangle-area-formulas',
        'special-triangles',
        'special-right-triangles',
        'triangle-medians-centroid',
        'angle-bisectors',
        'altitudes-orthocenter',
        'similarity-basics',
        'proportionality-thales',
        'law-of-sines',
        'law-of-cosines',
        'line-equations',
        'word-problems',
      ],
    },
  ],
  intermediate: [
    {
      name: 'Advanced Algebra',
      description: 'Quadratics, systems, and polynomial identities for AMC 10/12.',
      items: ['advanced-algebra',
        'higher-power-factorizations',
        'sophie-germain-identity',
        'newton-sums',
        'symmetric-polynomials',
        'symmetric-identity',
        'sum-formulas-powers',
      ],
    },
    {
      name: 'Functional Equations',
      description: 'Standard substitutions and symmetry-based approaches.',
      items: [
        'functional-equations',
      ],
    },
    {
      name: 'Counting & Casework',
      description: 'Multi-step counting with careful case analysis.',
      items: ['advanced-counting'],
    },
    {
      name: 'Probability',
      description: 'Conditional probability, geometric probability, and expected value.',
      items: ['probability-intermediate', 'geometric-probability'],
    },
    {
      name: 'Number Theory',
      description: 'Modular arithmetic, CRT, and divisibility techniques.',
      items: ['modular-arithmetic', 'number-theory-intermediate', 'chinese-remainder-theorem'],
    },
    {
      name: 'Euclidean Geometry',
      description: 'Circle theorems, power of a point, and cyclic quadrilaterals.',
      items: [
        'euclidean-geometry',
        'power-of-a-point',
        'cyclic-quadrilaterals',
        'tangent-lines',
        'tangent-circles',
        'arc-and-chord',
      ],
    },
    {
      name: 'Coordinate Geometry',
      description: 'Analytic methods, Shoelace formula, and coordinate-based proofs.',
      items: ['coordinate-geometry', 'shoelace-formula'],
    },
    {
      name: 'Inequalities',
      description: 'Algebraic and geometric inequality techniques for AMC/AIME.',
      items: ['inequalities'],
    },
    {
      name: 'Sequences & Series',
      description: 'Convergence, recursive formulas, and summation methods.',
      items: ['sequences-series'],
    },
    {
      name: 'Trigonometry',
      description: 'Unit circle, identities, and trig equations for contest math.',
      items: [
        'trig-unit-circle',
        'trig-identities',
        'trig-angle-addition',
        'trig-product-sum',
        'trig-equations',
        'trig-inverse-functions',
        'trig-triangle-laws',
        'trig-patterns',
      ],
    },
    {
      name: 'Complex Numbers',
      description: 'Complex arithmetic, polar form, roots of unity, and geometry.',
      items: [
        'complex-basics',
        'complex-algebra',
        'complex-conjugates',
        'complex-plane',
        'complex-polar-form',
        'complex-geometry',
        'roots-of-unity',
        'roots-of-unity-advanced',
        'complex-trigonometry',
      ],
    },
    {
      name: 'Geometry Extensions',
      description: 'Regular polygons and three-dimensional geometry.',
      items: ['regular-polygons', 'three-d-geometry'],
    },
  ],
  advanced: [
    {
      name: 'Strong Number Theory',
      description: 'Lifting the exponent, orders, and deeper divisibility arguments.',
      items: ['number-theory-advanced'],
    },
    {
      name: 'Advanced Counting',
      description: 'Generating functions, bijections, and harder combinatorial arguments.',
      items: ['counting-advanced'],
    },
    {
      name: 'Polynomials & Roots',
      description: 'Root bounding, irreducibility, and polynomial manipulation.',
      items: ['polynomials-roots'],
    },
    {
      name: 'Complex Numbers',
      description: 'Advanced complex number techniques for AIME geometry and algebra.',
      items: ['complex-numbers'],
    },
    {
      name: 'Advanced Geometry',
      description: 'Projective methods, inversions, homothety, and spiral similarity.',
      items: [
        'geometry-advanced',
        'sphere-geometry',
        'angle-chasing',
        'homothety-spiral-similarity',
      ],
    },
    {
      name: 'Trig in Contests',
      description: 'Contest-specific trig tricks and identities.',
      items: ['trig-contests'],
    },
    {
      name: 'Inequalities (AIME)',
      description: 'Schur, SOS, and multi-variable inequality techniques.',
      items: ['inequalities-advanced'],
    },
    {
      name: 'Generating Functions',
      description: 'Using formal power series to solve counting problems.',
      items: ['generating-functions'],
    },
    {
      name: 'Functional Equations (AIME)',
      description: 'Harder functional equations requiring injectivity and Cauchy-type analysis.',
      items: ['functional-equations-advanced'],
    },
  ],
  usamo: [
    {
      name: 'Proof Writing',
      description: 'Structuring clear, rigorous proofs for olympiad submissions.',
      items: ['proof-writing-basics'],
    },
    {
      name: 'Induction & Extremal',
      description: 'Strong induction, well-ordering, and extremal principle arguments.',
      items: ['induction-extremal'],
    },
    {
      name: 'Graph Theory Intro',
      description: 'Graphs, trees, coloring, and combinatorial structure.',
      items: ['graph-theory-intro'],
    },
    {
      name: 'Advanced Inequalities',
      description: 'Olympiad-level bounding with Schur, Muirhead, and mixing variables.',
      items: ['inequalities-olympiad'],
    },
    {
      name: 'Olympiad Number Theory',
      description: 'Vieta jumping, infinite descent, and olympiad divisibility.',
      items: ['olympiad-number-theory', 'vieta-root-jumping'],
    },
    {
      name: 'Olympiad Geometry',
      description: 'Synthetic and projective techniques for proof-based geometry.',
      items: ['olympiad-geometry'],
    },
    {
      name: 'Strategy & Writeups',
      description: 'Time management, problem selection, and solution presentation.',
      items: ['strategy-writeup'],
    },
  ],
};

export default MODULE_ORDERING;
export const SECTIONS: SectionID[] = Object.keys(
  MODULE_ORDERING
) as SectionID[];
export const SECTION_LABELS: { [key in SectionID]: string } = {
  foundations: 'Foundations (AMC 8)',
  intermediate: 'Intermediate (AMC 10-12)',
  advanced: 'Advanced (AIME)',
  usamo: 'Olympiad (USA(J)MO)',
} as const;
export const SECTION_SEO_DESCRIPTION: { [key in SectionID]: string } = {
  foundations:
    'AMC 8 preparation: arithmetic, data analysis, algebra, geometry, number theory, combinatorics, and probability.',
  intermediate:
    'AMC 10/12 topics: algebra, functional equations, counting, probability, number theory, geometry, inequalities, and sequences.',
  advanced:
    'AIME-level techniques: advanced number theory, counting, polynomials, complex numbers, geometry, trig, inequalities, and generating functions.',
  usamo:
    'USAMO preparation: proof writing, induction, extremal arguments, olympiad number theory and geometry, and contest strategy.',
};
export const SECTION_SEO_TITLES: { [key in SectionID]: string } = {
  foundations: 'Foundations (AMC 8)',
  intermediate: 'Intermediate (AMC 10-12)',
  advanced: 'Advanced (AIME)',
  usamo: 'Olympiad (USA(J)MO)',
};

const moduleIDToSectionMap: { [key: string]: SectionID } = {};

SECTIONS.forEach(section => {
  MODULE_ORDERING[section].forEach(category => {
    category.items.forEach(moduleID => {
      moduleIDToSectionMap[moduleID] = section;
    });
  });
});

export { moduleIDToSectionMap, moduleIDToURLMap };

const moduleIDToURLMap: { [key: string]: string } = {};

SECTIONS.forEach(section => {
  MODULE_ORDERING[section].forEach(category => {
    category.items.forEach(moduleID => {
      moduleIDToURLMap[moduleID] = `/${section}/${moduleID}`;
    });
  });
});
