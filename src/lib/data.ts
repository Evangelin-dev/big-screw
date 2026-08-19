/**
 * Every value in this file comes from the BigScrew Solutions catalogue.
 * Do not add specifications, claims or contact details that are not in the catalogue.
 */

import heroExcavator from "@/assets/image-0055.png";
import pileProduct from "@/assets/screw.png";
import pilesCrateImg from "@/assets/screw.png";
import groundProduct from "@/assets/ground.png";
import largeDiameterProduct from "@/assets/hp.png";
import factory from "@/assets/about.png";
import workerInstall from "@/assets/images.png";
import project1 from "@/assets/1.png";
import project2 from "@/assets/2.png";
import project3 from "@/assets/3.png";
import project4 from "@/assets/4.png";
import project5 from "@/assets/5.png";
import project6 from "@/assets/6.png";
import project7 from "@/assets/7.png";
import project8 from "@/assets/8.png";
import facilityImg1 from "@/assets/1.jpg";
import facilityImg2 from "@/assets/2.jpg";
import facilityImg3 from "@/assets/3.jpg";
import facilityImg4 from "@/assets/4.jpeg";
import facilityImg5 from "@/assets/5.jpg";
import facilityImg6 from "@/assets/6.jpg";

import prefabHouse from "@/assets/image-0074.jpg";
import prefabModular from "@/assets/image-0075.jpg";
import prefabSite from "@/assets/image-0076.jpg";
import polyhouse from "@/assets/13.png";
import solarSite from "@/assets/solar.jfif";
import Picture1 from "@/assets/Picture1.png";
import Picture2 from "@/assets/Picture2.png";
import Picture3 from "@/assets/Picture3.png";
import solarDual from "@/assets/image-0058.jpg";
import solarSingle from "@/assets/11.png";
import solarHill from "@/assets/image-0063.jpg";
import bessSite from "@/assets/image-0068.jpg";
import bessContainer from "@/assets/12.png";
import bessLayout from "@/assets/image-0069.jpg";
import bessFoundation from "@/assets/image-0070.jpg";
import carport from "@/assets/image-0081.jpg";
import evCharging from "@/assets/image-0082.jpg";
import industrial from "@/assets/image-0083.jpg";
import heatExchanger from "@/assets/image-0084.jpg";
import fenceBoundary from "@/assets/image-0087.jpg";
import fenceLine from "@/assets/14.jpg";
import helicalPilesDetail from "@/assets/image-0088.png";
import fenceDetail from "@/assets/image-0089.jpg";
import fenceRun from "@/assets/image-0090.jpg";
import transmissionTower from "@/assets/image-0093.jpg";
import lightPole from "@/assets/image-0094.jpg";
import towerBase from "@/assets/image-0095.jpg";
import towerLeg from "@/assets/image-0095.jpg";
import poleDetail from "@/assets/15.png";
import bridgePlatform from "@/assets/image-0100.jpg";
import seaview from "@/assets/image-0101.jpg";
import walkbridge from "@/assets/image-0102.jpg";
import pedestrianBridge from "@/assets/image-0103.jpg";
import logoMark from "@/assets/logo-mark.png";

const unsplashId = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;

export const img = {
  heroExcavator,
  workerInstall,
  pilesCrate: pilesCrateImg,
  towerBase,
  factory,
  pileProduct,
  groundProduct,
  largeDiameterProduct,
  project1,
  project2,
  project3,
  project4,
  project5,
  project6,
  project7,
  project8,
  facilityImg1,
  facilityImg2,
  facilityImg3,
  facilityImg4,
  facilityImg5,
  facilityImg6,
  solarDual,
  solarSingle,
  solarSite,
  solarHill,
  Picture1,
  Picture2,
  Picture3,
  bessContainer,
  bessSite,
  bessLayout,
  bessFoundation,
  prefabHouse,
  prefabModular,
  prefabSite,
  polyhouse,
  carport,
  evCharging,
  industrial,
  heatExchanger,
  fenceBoundary,
  fenceLine,
  helicalPilesDetail,
  fenceDetail,
  fenceRun,
  transmissionTower,
  lightPole,
  towerLeg,
  poleDetail,
  bridgePlatform,
  seaview,
  walkbridge,
  pedestrianBridge,
  logoMark,
};

export const company = {
  name: "BigScrew Solutions",
  tagline: "Foundations, driven not poured.",
  address: {
    line1: "Plot No. R-413,",
    line2: "MIDC TTC Industrial Area,",
    line3: "Rabale, Navi Mumbai 400701,",
    line4: "India",
  },
  addressOneLine:
    "Plot No. R-413, MIDC TTC Industrial Area, Rabale, Navi Mumbai 400701, India",
  phone: "+91 98923 85568",
  phoneHref: "tel:+919892385568",
  web: "www.bigscrew.in",
  webHref: "https://www.bigscrew.in",
};

export const stats = [
  { value: "20,000", label: "Screw pile manufacturing capacity" },
  { value: "100%", label: "Automated manufacturing" },
  { value: "3 YRS", label: "Exporting worldwide" },
  { value: "#1", label: "Exporter in India" },
];

export const whyBigscrew = [
  {
    title: "Made in-house",
    body: "Every pile is made ourselves, so it can be made to fit your project exactly.",
  },
  {
    title: "Quality checked",
    body: "Every batch is checked before it leaves the factory, for the same quality every time.",
  },
  {
    title: "Priced right",
    body: "Making everything ourselves keeps costs down, without cutting corners on quality.",
  },
  {
    title: "Fast turnaround",
    body: "Automated machines and an organised factory floor keep orders on schedule.",
  },
];

export const services = [
  {
    n: "01",
    title: "Design",
    body: "We work out the right pile size and layout for your structure, soil and loads.",
    image: img.facilityImg1,
    alt: "BigScrew design engineering and planning process",
  },
  {
    n: "02",
    title: "Manufacturing",
    body: "Every pile is made in-house, on automated lines, and checked before it ships.",
    image: img.facilityImg2,
    alt: "BigScrew automated manufacturing facility",
  },
  {
    n: "03",
    title: "Installation",
    body: "Our own crew and machines turn the piles into the ground and get you building fast.",
    image: img.facilityImg3,
    alt: "BigScrew installation team working on site",
  },
];

export const installSteps = [
  { n: "01", title: "Position", body: "Set out on the drawing grid." },
  { n: "02", title: "Drive", body: "Turned to design depth." },
  { n: "03", title: "Check", body: "Check it's turned in firmly enough." },
  { n: "04", title: "Load", body: "Structure set the same day." },
];

export const conventionalSteps = ["Dig", "Form", "Pour", "Wait", "Build"];
export const bigscrewSteps = ["Position", "Drive", "Check", "Load"];

export const pileTypes = [
  {
    n: "01",
    slug: "ground-screws",
    name: "Ground screws",
    summary: "A long spiral thread running down the central shaft.",
    body: "For lighter structures and efficient, low-disturbance installation on solid ground.",
    applications: "Fencing, prefab house plots, light structures",
    image: img.groundProduct,
    alt: "Ground screw with continuous spiral thread down the shaft",
  },
  {
    n: "02",
    slug: "helical-piles",
    name: "Helical piles",
    summary: "A steel shaft with one or more helical plates.",
    body: "A versatile foundation system used for everyday civil and structural loads.",
    applications: "Solar, sheds, residential, utility structures",
    image: img.helicalPilesDetail,
    alt: "Helical screw pile installed as a foundation element",
  },
  {
    n: "03",
    slug: "large-diameter-screw-piles",
    name: "Large diameter screw piles",
    summary: "A thicker shaft and larger helix for heavier loads.",
    body: "Designed for higher capacity foundations and more demanding applications.",
    applications: "Industrial structures, heavy foundations, infrastructure",
    image: img.largeDiameterProduct,
    alt: "Large-diameter screw pile foundation under a tower leg",
  },
];

export const pileMatrix = {
  columns: ["Solar", "BESS", "Prefab", "Industrial", "Fencing"],
  rows: [
    { type: "Ground screws", fit: ["no", "none", "no", "none", "primary"] },
    { type: "Helical piles", fit: ["primary", "no", "primary", "no", "primary"] },
    { type: "Large diameter screw piles", fit: ["none", "no", "none", "primary", "none"] },
  ] as { type: string; fit: ("primary" | "no" | "none")[] }[],
};

export const soilMachinery = [
  {
    soil: "Soft clay, silt",
    carrier: "Mini excavator, 1.5–3 t",
    driveHead: "Low-torque",
    approach: "Larger helix, deeper embedment",
  },
  {
    soil: "Firm clay, sandy soil",
    carrier: "Excavator, 5–8 t",
    driveHead: "Medium-torque",
    approach: "Single or double helix",
  },
  {
    soil: "Dense sand, gravel",
    carrier: "Excavator, 13–20 t",
    driveHead: "High-torque",
    approach: "Reduced helix diameter",
  },
  {
    soil: "Murum, weathered rock",
    carrier: "Excavator, 20 t and above",
    driveHead: "High-torque",
    approach: "Rock helix, pre-drill where needed",
  },
  {
    soil: "Filled or made-up ground",
    carrier: "Excavator, 8–13 t",
    driveHead: "Medium-torque",
    approach: "Extendable pile through the fill",
  },
  {
    soil: "Restricted access, indoors",
    carrier: "Skid-steer or handheld unit",
    driveHead: "Low-torque",
    approach: "Short coupled sections",
  },
];

export type SpecRow = Record<string, string>;

export type Application = {
  n: string;
  slug: string;
  short: string;
  title: string;
  headline: string;
  headlineAccent: string;
  intro: string;
  pileTypes: string;
  hero: string;
  heroAlt: string;
  gallery: { src: string; alt: string; caption: string }[];
  specHeaders: string[];
  specRows: SpecRow[];
  metaTitle: string;
  metaDescription: string;
};

export const applications: Application[] = [
  {
    n: "01",
    slug: "solar",
    short: "Solar",
    title: "Solar ground mount",
    headline: "Solar",
    headlineAccent: "ground mount",
    intro:
      "Solar panel tables sit directly on screw piles — no concrete base needed. We place a row of piles in one pass, lined up accurately so the panel frame sits straight. BigScrew works on rocky, sandy, clay & mixed soils.",
    pileTypes: "Single-helix · Double-helix · Ground screw, U-head",
    hero: img.solarSite,
    heroAlt: "Large solar ground mount array founded on screw piles",
    gallery: [
      { src: img.solarDual, alt: "Dual pole solar table on screw piles", caption: "Dual pole solar" },
      { src: img.solarSingle, alt: "Single pole solar mount on screw piles", caption: "Single pole" },
      { src: img.solarSite, alt: "Solar site installation on screw pile foundations", caption: "Site installation" },
      { src: img.solarHill, alt: "Hillside solar array installed on screw piles", caption: "Site installation" },
    ],
    specHeaders: ["Pile type", "Shaft Ø", "Helix", "Length", "Coating"],
    specRows: [
      { "Pile type": "Single-helix pile", "Shaft Ø": "76, 89", Helix: "1", Length: "1200–2500", Coating: "HDG" },
      { "Pile type": "Double-helix pile", "Shaft Ø": "76, 89", Helix: "2", Length: "1200–2500", Coating: "HDG" },
      {
        "Pile type": "Ground screw, U-head",
        "Shaft Ø": "76, 89",
        Helix: "Continuous spiral",
        Length: "1200–2500",
        Coating: "HDG",
      },
    ],
    metaTitle: "Screw Piles for Solar Ground Mount | BigScrew Solutions",
    metaDescription:
      "Helical screw pile foundations for solar ground mount. Panel tables sit directly on piles — no concrete base. Shaft Ø 76–89, HDG coated, installed by BigScrew.",
  },
  {
    n: "02",
    slug: "bess",
    short: "BESS",
    title: "Battery energy storage",
    headline: "Battery",
    headlineAccent: "energy storage",
    intro:
      "Battery storage containers are heavy, and that weight sits on just a few corner points. We put a pile under each corner, level it with an adjustable top, and join the piles with a steel frame so the container sits flat — no concrete slab needed.",
    pileTypes: "Heavy-duty round-shaft pile · Heavy duty groundscrew",
    hero: img.bessSite,
    heroAlt: "Battery energy storage containers on screw pile foundations",
    gallery: [
      { src: img.bessContainer, alt: "Battery storage container supported on screw piles", caption: "BESS container" },
      { src: img.bessSite, alt: "Battery energy storage site on screw pile foundations", caption: "BESS site" },
      { src: img.bessLayout, alt: "Screw pile layout set out on a battery storage site", caption: "Pile layout" },
      { src: img.bessFoundation, alt: "Steel frame joining screw piles under storage containers", caption: "Foundation detail" },
    ],
    specHeaders: ["Pile type", "Shaft Ø", "Helix", "Length", "Coating"],
    specRows: [
      {
        "Pile type": "Heavy-duty round-shaft pile",
        "Shaft Ø": "89, 100, 114",
        Helix: "2–3",
        Length: "2000–4000",
        Coating: "HDG",
      },
      {
        "Pile type": "Heavy duty groundscrew",
        "Shaft Ø": "89, 100, 114",
        Helix: "Continuous spiral",
        Length: "2000–4000",
        Coating: "HDG",
      },
    ],
    metaTitle: "Screw Pile Foundations for BESS Battery Storage | BigScrew",
    metaDescription:
      "Heavy-duty helical screw piles for battery energy storage containers. Corner piles, adjustable tops and a steel frame — no concrete slab needed.",
  },
  {
    n: "03",
    slug: "prefab",
    short: "Prefab",
    title: "Polyhouses, prefab & modular homes",
    headline: "Polyhouses, prefab",
    headlineAccent: "& modular homes",
    intro:
      "Prefab, modular homes & polyhouses are light, but they still need a level base to sit on. We install piles to match the home's frame, which can be directly bolted. This works even on sloping or remote land, with no digging and dependency on local civil contractors. Screw pile can help you build in the remotest of the location with minimal labor.",
    pileTypes: "Modular house single-helix pile · Light-gauge ground screw · Ground screw with single helix",
    hero: img.prefabHouse,
    heroAlt: "Prefab timber house on a slope supported by screw pile foundations",
    gallery: [
      { src: img.prefabHouse, alt: "Prefab house built on screw piles over sloping ground", caption: "Prefab house" },
      { src: img.prefabModular, alt: "Modular home levelled on screw pile foundations", caption: "Foundation detail" },
      { src: img.prefabSite, alt: "Timber prefab site founded on screw piles", caption: "Prefab site" },
      { src: img.polyhouse, alt: "Polyhouse structure anchored on light-gauge ground screws", caption: "Polyhouse" },
    ],
    specHeaders: ["Pile type", "Shaft Ø", "Head", "Length", "Coating"],
    specRows: [
      {
        "Pile type": "Modular house single-helix pile",
        "Shaft Ø": "76–114",
        Head: "Bolted bracket",
        Length: "2000–5000",
        Coating: "HDG",
      },
      {
        "Pile type": "Light-gauge ground screw, polyhouse",
        "Shaft Ø": "60, 76",
        Head: "U-bracket / tube socket",
        Length: "1000–1500",
        Coating: "HDG",
      },
      {
        "Pile type": "Ground screw with single helix",
        "Shaft Ø": "76, 89",
        Head: "Threaded, adjustable",
        Length: "1500–3000",
        Coating: "HDG",
      },
    ],
    metaTitle: "Screw Piles for Prefab Homes & Polyhouses | BigScrew Solutions",
    metaDescription:
      "Screw pile foundations for prefab, modular homes and polyhouses. Bolt the frame straight down — no digging, works on sloping and remote land.",
  },
  {
    n: "04",
    slug: "industrial",
    short: "Industrial",
    title: "Industrial structures, carports & EV charging",
    headline: "Industrial structures,",
    headlineAccent: "carports & EV charging",
    intro:
      "Screw piles carry heavy moment induced structures including solar carports, EV charging bays and industrial buildings. Design starts with the geotechnical report or a verification pile, and the pile is then sized to the governing case. Shaft diameter, wall thickness and helix configuration are set per site rather than taken from a catalogue standard. BigScrew designs, manufactures and installs, which keeps engineering, production and site work under one accountable party",
    pileTypes: "Large-diameter carport screw pile · Light EV groundscrews · Heavy infra screw piles",
    hero: img.carport,
    heroAlt: "Solar carport structure founded on large-diameter screw piles",
    gallery: [
      { src: img.carport, alt: "Solar carport on large-diameter screw pile foundations", caption: "Carport" },
      { src: img.evCharging, alt: "EV charging bay mounted on a ground screw foundation", caption: "EV charging" },
      { src: img.industrial, alt: "Industrial silo structure on screw pile foundations", caption: "Industrial structure" },
      { src: img.heatExchanger, alt: "Heat exchanger base supported on screw piles", caption: "Heat exchanger base" },
    ],
    specHeaders: ["Pile type", "Shaft Ø", "Helix", "Length", "Coating"],
    specRows: [
      {
        "Pile type": "Large-diameter carport screw pile",
        "Shaft Ø": "89–114",
        Helix: "2–4",
        Length: "3000–5000",
        Coating: "HDG",
      },
      { "Pile type": "Light EV groundscrews", "Shaft Ø": "76–89", Helix: "2–3", Length: "1500–2500", Coating: "HDG" },
      { "Pile type": "Heavy infra screw piles", "Shaft Ø": "76–114", Helix: "1–2", Length: "1500–5000", Coating: "HDG" },
    ],
    metaTitle: "Screw Piles for Industrial Structures, Carports & EV | BigScrew",
    metaDescription:
      "Helical screw piles for industrial buildings, solar carports and EV charging bays. Sized to the governing case from geotechnical report or verification pile.",
  },
  {
    n: "05",
    slug: "fencing",
    short: "Fencing",
    title: "Fencing and boundary wall",
    headline: "Fencing and",
    headlineAccent: "boundary wall",
    intro:
      "Fences and boundary walls often run for kilometres over changing ground, and normally every post has to wait for cement to set. With screw piles, we go post by post along the line, level each one, and bolt the post or panel straight on — a whole stretch can be set up and finished the same day.",
    pileTypes: "Fence-post ground screw · Single-helix pile, flange head",
    hero: img.fenceRun,
    heroAlt: "Long metal fence run installed on screw pile foundations",
    gallery: [
      { src: img.fenceBoundary, alt: "Boundary wall panel founded on a ground screw", caption: "Boundary wall" },
      { src: img.fenceLine, alt: "Fence line running across open ground on screw piles", caption: "Fence line" },
      { src: img.fenceDetail, alt: "Flange plate head bolted to a fence post", caption: "Foundation detail" },
      { src: img.fenceRun, alt: "Completed fence run on screw pile foundations", caption: "Fence run" },
    ],
    specHeaders: ["Pile type", "Shaft Ø", "Head", "Length", "Coating"],
    specRows: [
      { "Pile type": "Fence-post ground screw", "Shaft Ø": "76–89", Head: "Flange plate", Length: "1000–1500", Coating: "HDG" },
      {
        "Pile type": "Single-helix pile, flange head",
        "Shaft Ø": "76–89",
        Head: "Flange plate",
        Length: "1200–2000",
        Coating: "HDG",
      },
    ],
    metaTitle: "Screw Piles for Fencing & Boundary Walls | BigScrew Solutions",
    metaDescription:
      "Ground screws and single-helix piles for fencing and boundary walls. Post by post along the line, bolted straight on, finished the same day.",
  },
  {
    n: "06",
    slug: "poles-towers",
    short: "Poles & Towers",
    title: "Light poles, electric poles & transmission towers",
    headline: "Light poles, electric poles",
    headlineAccent: "& transmission towers",
    intro:
      "Streetlights, electric poles and transmission towers are tall and thin, so the biggest risk is wind or cable pull pushing them over — not just their weight. Our proprietary screw piles can withstand heavy lateral loads. Screw piles are the perfect solution for high volume, heavy infrastructure products.",
    pileTypes: "Single-helix pile, base plate · Double-helix pile, high-moment · Multi-leg tower footing pile",
    hero: img.transmissionTower,
    heroAlt: "Transmission tower structures under construction on screw pile foundations",
    gallery: [
      { src: img.lightPole, alt: "Roadside light poles founded on screw piles", caption: "Light pole" },
      { src: img.towerLeg, alt: "Tower leg seated on a screw pile base plate", caption: "Tower leg detail" },
      { src: img.transmissionTower, alt: "Transmission tower site on screw pile foundations", caption: "Transmission tower" },
      { src: img.poleDetail, alt: "Section detail of a pole foundation on screw piles", caption: "Pole detail" },
    ],
    specHeaders: ["Pile type", "Shaft Ø", "Head", "Length", "Coating"],
    specRows: [
      { "Pile type": "Single-helix pile, base plate", "Shaft Ø": "—", Head: "Bolted base plate", Length: "—", Coating: "HDG" },
      {
        "Pile type": "Double-helix pile, high-moment",
        "Shaft Ø": "—",
        Head: "Bolted base plate",
        Length: "—",
        Coating: "HDG",
      },
      { "Pile type": "Multi-leg tower footing pile", "Shaft Ø": "—", Head: "Stub angle / grillage", Length: "—", Coating: "HDG" },
    ],
    metaTitle: "Screw Piles for Poles & Transmission Towers | BigScrew",
    metaDescription:
      "Screw pile foundations for light poles, electric poles and transmission towers. Engineered for heavy lateral loads and high volume infrastructure.",
  },
  {
    n: "07",
    slug: "bridges",
    short: "Bridges",
    title: "Walkbridges, sea view platforms & bridges",
    headline: "Walkbridges, sea view platforms",
    headlineAccent: "& bridges",
    intro:
      "Coastal walkways, viewing decks and footbridges often sit over tidal water, marsh or rocky ground where a concrete footing means building a temporary dam and a long wait for it to dry. Screw piles are installed from the shore itself. They carry the deck's weight and also grip against waves and currents trying to pull them up, with no wet cement work over water.",
    pileTypes: "Marine-grade round-shaft pile · Extendable pile, coupled sections",
    hero: img.bridgePlatform,
    heroAlt: "Elevated viewing platform and walkbridge on screw pile foundations",
    gallery: [
      { src: img.walkbridge, alt: "Underside of a walkbridge deck carried on screw piles", caption: "Walkbridge" },
      { src: img.seaview, alt: "Screw piles installed through a forest walkway route", caption: "Sea view platform" },
      { src: img.pedestrianBridge, alt: "Pedestrian bridge on screw pile foundations", caption: "Pedestrian bridge" },
      { src: img.bridgePlatform, alt: "Viewing platform structure over rocky ground on screw piles", caption: "Installation over water" },
    ],
    specHeaders: ["Pile type", "Shaft Ø", "Head", "Length", "Coating"],
    specRows: [
      {
        "Pile type": "Marine-grade round-shaft pile",
        "Shaft Ø": "89–114",
        Head: "Deck bracket",
        Length: "2000–5000",
        Coating: "HDG + Epoxy",
      },
      {
        "Pile type": "Extendable pile, coupled sections",
        "Shaft Ø": "76–114",
        Head: "Flange plate",
        Length: "2000–5000",
        Coating: "HDG + Epoxy",
      },
    ],
    metaTitle: "Screw Piles for Walkbridges & Sea View Platforms | BigScrew",
    metaDescription:
      "Marine-grade helical screw piles for walkbridges, viewing decks and footbridges. Installed from the shore, no wet cement work over water.",
  },
];

export const getApplication = (slug: string) => applications.find((a) => a.slug === slug);

export const galleryItems = [
  { src: img.project1, alt: "Project 1 installation", caption: "Project 1", app: "Solar" },
  { src: img.project2, alt: "Project 2 installation", caption: "Project 2", app: "BESS" },
  { src: img.project3, alt: "Project 3 installation", caption: "Project 3", app: "Prefab" },
  { src: img.project4, alt: "Project 4 installation", caption: "Project 4", app: "Industrial" },
  { src: img.project5, alt: "Project 5 installation", caption: "Project 5", app: "Fencing" },
  { src: img.project6, alt: "Project 6 installation", caption: "Project 6", app: "Utilities" },
  { src: img.project7, alt: "Project 7 installation", caption: "Project 7", app: "Infrastructure" },
  { src: img.project8, alt: "Project 8 installation", caption: "Project 8", app: "Project" },
];

export const navLinks = [
  { label: "HOME", to: "/" },
  { label: "About", to: "/about" },
  { label: "Applications", to: "/applications" },
  { label: "Screw Piles", to: "/screw-piles" },
  { label: "Installation", to: "/installation" },
  { label: "Projects", to: "/projects" },
  { label: "Facility", to: "/facility" },
  { label: "BLOG", to: "/blog" },
];
