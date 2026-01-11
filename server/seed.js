import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Idea from './models/Idea.js';

dotenv.config();

const realisticIdeas = [
    {
        title: "Quibi - Quick-Bite Cinema",
        category: "Tech",
        stage: "Launch",
        problem: "Mobile users have short attention spans and need premium content optimized for vertical viewing on the go.",
        solution: "A streaming service with $1.75B in funding producing 10-minute high-budget episodes that can flip between horizontal and vertical viewing.",
        failureReason: "Ignored social features (couldn't screenshot/share clips), launched during a pandemic when nobody was 'on the go', and underestimated free competition like TikTok/YouTube.",
        author: "Jeffrey K.",
        school: "Hollywood University",
        stats: { forks: 42, comments: 156, views: 2400 }
    },
    {
        title: "Juicero - The Smart Juicer",
        category: "Tech",
        stage: "Launch",
        problem: "Making fresh cold-pressed juice at home is messy and requires significant prep time.",
        solution: "A $400 internet-connected press that uses proprietary fruit packs to deliver 'perfect' juice without cleaning.",
        failureReason: "Critical design flaw: A viral video showed that the juice packs could be squeezed just as effectively by hand, making the expensive hardware redundant.",
        author: "Doug E.",
        school: "Innovation Lab",
        stats: { forks: 12, comments: 89, views: 1800 }
    },
    {
        title: "Aereo - Cloud TV Antenna",
        category: "Research",
        stage: "Validation",
        problem: "Cable TV is too expensive, and consumers want a way to stream local broadcast TV over the internet legaly.",
        solution: "Assigned a tiny individual antenna to every user in a remote data center to bypass legal retransmission fees.",
        failureReason: "Legal failure. The Supreme Court ruled that it functioned too much like a cable company, leading to a massive copyright lawsuit that shut them down.",
        author: "Chet K.",
        school: "NYU Law",
        stats: { forks: 28, comments: 45, views: 920 }
    },
    {
        title: "Pebble Smartwatch",
        category: "Tech",
        stage: "Launch",
        problem: "People want notifications on their wrist without charging their watch every single day.",
        solution: "E-paper display smartwatch with 7-day battery life and an open developer ecosystem.",
        failureReason: "Out-competed by tech giants (Apple/Samsung) with deeper pockets and better marketing, despite having a more loyal developer community.",
        author: "Eric M.",
        school: "Waterloo",
        stats: { forks: 154, comments: 310, views: 5600 }
    },
    {
        title: "Pets.com",
        category: "Business",
        stage: "Launch",
        problem: "Pet owners hate carrying heavy bags of dog food from physical stores to their homes.",
        solution: "An online marketplace for pet supplies with a famous sock-puppet mascot and aggressive advertising.",
        failureReason: "High shipping costs for heavy items wiped out the slim margins. They spent $300 on advertising for every $100 they earned in revenue.",
        author: "Julie W.",
        school: "Wharton",
        stats: { forks: 5, comments: 22, views: 1100 }
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB for seeding...");

        // Clear existing data
        await Idea.deleteMany({});
        console.log("Cleared all existing idea data.");

        // Insert new data
        await Idea.insertMany(realisticIdeas);
        console.log(`Successfully added ${realisticIdeas.length} realistic failed startup case studies.`);

        mongoose.connection.close();
        process.exit();
    } catch (error) {
        console.error("Seeding Error:", error);
        process.exit(1);
    }
};

seedDB();
