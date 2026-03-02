export const content = {
  brand: {
    name: "WasteWiz",
    tagline: "Smarter sorting. Cleaner recycling streams.",
    description:
      "A spectroscopy-enhanced waste classification system that identifies material composition at the point of disposal, educates users in real time, and reduces contamination across recycling streams.",
  },
  stats: [
    { label: "Recyclables lost annually to contamination", value: 11.4, suffix: "B USD", note: "estimated value" },
    { label: "Plastic packaging recycled", value: 14, suffix: "%", note: "current" },
    { label: "Projected classification accuracy", value: 98.6, suffix: "%", note: "target" },
  ],
  problem: [
    { title: "Lack of waste sorting", body: "Mixed waste makes downstream recovery expensive and inefficient." },
    { title: "Infrastructure gaps", body: "Limited bin capacity, signage, and inconsistent programs raise error rates." },
    { title: "Behavior + training", body: "Busy staff and unclear guidelines lead to contamination and fees." },
  ],
  howItWorks: [
    { step: "01", title: "Scan at the bin", body: "User scans the item at disposal time." },
    { step: "02", title: "Material identified", body: "Spectroscopy + indicators classify the material stream." },
    { step: "03", title: "Sort correctly + learn", body: "User places the item in the correct bin and gets instant feedback." },
  ],
  caseStudies: [
    {
      title: "Westin Boston Waterfront Hotel",
      highlight: "$60K saved annually",
      details: [
        "$6K saved in a month from recycling efforts",
        "225K kWh saved (enough to power ~21 homes for a year)",
      ],
    },
    {
      title: "UC Berkeley",
      highlight: "2K tons diverted",
      details: [
        "$60K saved annually by recycling programs",
        "Projects: paper + beverage containers, dorm recycling, public bins",
      ],
    },
    {
      title: "Blue Man Group",
      highlight: "70% cost reduction",
      details: ["42 tons of combined recyclables + food waste diverted annually", "70% reduction in waste and recycling costs"],
    },
  ],
  market: [
    { label: "BU CDS (test-bed)", value: "78", suffix: " mixed recycling bins" },
    { label: "BU campus", value: "~1500", suffix: " total bins" },
    { label: "Boston footprint", value: "4283", suffix: " restaurants" },
    { label: "Boston footprint", value: "73", suffix: " hotels" },
  ],
  revenue: {
    costPrice: 200,
    sellingPrice: 400,
    installBins: 78,
    contaminationTonsPerMonth: 2.25,
    contaminationFeePerTon: 225,
  },
  roadmap: [
    {
      phase: "Phase 1",
      title: "MVP build + pilot",
      bullets: ["Literature review + conceptual design", "Idea validation with industry + BU Zero Waste stakeholders"],
    },
    {
      phase: "Phase 2",
      title: "Deploy + learn",
      bullets: ["MVP development and deployment (EPIC)", "Testing at CDS", "Data + feedback collection (Build Lab support)"],
    },
    {
      phase: "Phase 3",
      title: "Expand capabilities",
      bullets: ["Refine based on feedback", "Classify a wider range of materials", "APIs + auxiliary systems"],
    },
    {
      phase: "Future",
      title: "Scale impact",
      bullets: ["Data aggregation + unified data source across municipalities", "Reward-based system exploration (Web3)"],
    },
  ],
  team: [
    { name: "Aru Pandey", role: "Founder", org: "Walmart" }],
}
