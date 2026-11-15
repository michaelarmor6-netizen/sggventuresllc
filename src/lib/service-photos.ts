/**
 * One illustrative photograph per service, served from Unsplash's image CDN
 * (https://unsplash.com/license: free to use, no permission needed). These
 * are stock photographs, not SGG Ventures staff, clients, or premises.
 */
type ServicePhoto = { id: string; alt: string };

const PHOTOS: Record<string, ServicePhoto> = {
  "business-strategy": {
    id: "1532622785990-d2c36a76f5a6",
    alt: "Two people sketching a plan on a whiteboard",
  },
  "market-entry": {
    id: "1486406146926-c627a92ad1ab",
    alt: "Office towers seen from street level",
  },
  "business-planning": {
    id: "1454165804606-c3d57bc86b40",
    alt: "Hands with a pencil and notes beside a laptop",
  },
  "process-improvement": {
    id: "1769731738826-a51acd5bddc7",
    alt: "A hand drawing a process diagram on a whiteboard",
  },
  "operational-excellence": {
    id: "1627309366653-2dedc084cdf1",
    alt: "Warehouse aisles of shelving stacked with boxes",
  },
  "organizational-development": {
    id: "1758691737543-09a1b2b715fa",
    alt: "A team meeting in a bright office",
  },
  "executive-advisory": {
    id: "1517245386807-bb43f82c33c4",
    alt: "A person gesturing during a meeting with a laptop open",
  },
  "change-management": {
    id: "1758691736872-61a1f75fe2d5",
    alt: "A team arranging sticky notes on a glass wall",
  },
  "growth-strategies": {
    id: "1758519289074-9de36003622b",
    alt: "Two colleagues reviewing charts on a laptop",
  },
  "performance-improvement": {
    id: "1551288049-bebda4e38f71",
    alt: "Performance charts on a laptop screen",
  },
  "governance-support": {
    id: "1517048676732-d65bc937f952",
    alt: "People around a meeting table with notebooks",
  },
  "technology-assessments": {
    id: "1573164713988-8665fc963095",
    alt: "An engineer working on a laptop beside server racks",
  },
  "enterprise-architecture": {
    id: "1558494949-ef010cbdcc31",
    alt: "Network cabling running into a patch panel",
  },
  "cloud-strategy": {
    id: "1451187580459-43490279c0fa",
    alt: "The Earth at night with lit networks of cities",
  },
  "cybersecurity-advisory": {
    id: "1614064641938-3bbee52942c7",
    alt: "A padlock resting on a computer keyboard",
  },
  "infrastructure-optimization": {
    id: "1584169417032-d34e8d805e8b",
    alt: "An aisle between server racks in a data centre",
  },
  "process-digitization": {
    id: "1583521214690-73421a1829a9",
    alt: "Stacks of paper documents and file folders",
  },
  "workflow-modernization": {
    id: "1522071820081-009f0129c71c",
    alt: "A team working together on laptops",
  },
  "business-systems-integration": {
    id: "1683322499436-f4383dd59f5a",
    alt: "Blue network cables plugged into a switch",
  },
  "data-strategy": {
    id: "1526628953301-3e589a6a8b74",
    alt: "A monitoring screen showing data panels",
  },
  "power-platform": {
    id: "1787839227786-17f3149942a5",
    alt: "A tablet showing a task board on a desk",
  },
  "power-apps": {
    id: "1551650975-87deedd944c3",
    alt: "A hand holding a phone with a business app open",
  },
  "power-automate": {
    id: "1783115259399-3a5a3e0e4592",
    alt: "Hands typing on a laptop with a spreadsheet open",
  },
  "power-bi": {
    id: "1460925895917-afdab827c52f",
    alt: "A laptop showing a reporting dashboard",
  },
  "microsoft-365": {
    id: "1573164574572-cb89e39749b4",
    alt: "Colleagues working on laptops around a shared table",
  },
  "crm-advisory": {
    id: "1758518731706-be5d5230e5a5",
    alt: "A business team talking in a modern office",
  },
  "erp-advisory": {
    id: "1587293852726-70cdb56c2866",
    alt: "Cardboard boxes on warehouse racking",
  },
  "workflow-automation": {
    id: "1590103514966-5e2a11c13e21",
    alt: "A person mapping steps on a whiteboard",
  },
  "custom-web-applications": {
    id: "1498050108023-c5249f4df085",
    alt: "A laptop showing code on a busy desk",
  },
  "customer-portals": {
    id: "1499951360447-b19be8fe80f5",
    alt: "A laptop and desktop monitor side by side on a desk",
  },
  "enterprise-systems": {
    id: "1564457461758-8ff96e439e83",
    alt: "Rows of server cabinets under overhead cabling",
  },
  "mobile-applications": {
    id: "1512941937669-90a1b58e7e9c",
    alt: "A smartphone home screen",
  },
  "api-integrations": {
    id: "1555949963-ff9fe0c870eb",
    alt: "Close-up of code on a screen",
  },
  "saas-platforms": {
    id: "1607799279861-4dd421887fb3",
    alt: "A laptop screen displaying colourful code",
  },
  "corporate-websites": {
    id: "1467232004584-a241de8bcf5d",
    alt: "A desktop computer showing a website in a quiet room",
  },
  "landing-pages": {
    id: "1522542550221-31fd19575a2d",
    alt: "Wireframe sketches of web page layouts",
  },
  "ecommerce-storefronts": {
    id: "1563013544-824ae1b704d3",
    alt: "A shopper holding a card while paying online on a laptop",
  },
  "content-and-seo": {
    id: "1603796846097-bee99e4a601f",
    alt: "A person writing notes on paper",
  },
  "website-care": {
    id: "1487338875411-8880f74114a2",
    alt: "Two monitors set up on a desk",
  },
  "ai-strategy": {
    id: "1677442135703-1787eea5ce01",
    alt: "A circuit board with a brain-shaped chip, illustrating AI",
  },
  "ai-automation": {
    id: "1737644467636-6b0053476bb2",
    alt: "A white humanoid robot against a dark background",
  },
  "ai-workflows": {
    id: "1674027444485-cec3da58eef4",
    alt: "An abstract sphere of connected points",
  },
  "knowledge-management": {
    id: "1695388474402-ed805a890d8d",
    alt: "A woman reading a document at a table",
  },
  "intelligent-assistants": {
    id: "1694903089438-bf28d4697d9a",
    alt: "Robot and human hands reaching toward each other",
  },
};

export const UNSPLASH_NOTE =
  "Illustrative photo via Unsplash, not our team or clients.";

/** Unsplash CDN URL; next/image adds width and quality on top. */
export function servicePhoto(
  slug: string,
): { src: string; alt: string } | null {
  const photo = PHOTOS[slug];
  if (!photo) return null;
  return {
    src: `https://images.unsplash.com/photo-${photo.id}?auto=format&fit=crop&w=1800&q=80`,
    alt: photo.alt,
  };
}
