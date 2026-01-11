export const MOCK_IDEAS = [
    {
        id: 1,
        title: "Campus Food Waste Tracker",
        category: "Sustainability",
        desc: "An app to track and reduce food waste in university dining halls. Rejected at hackathon due to scope creep.",
        problem: "Dining halls throw away 40% of prepared food because student demand is hard to predict and students take more than they eat.",
        solution: "A mobile app where students check-in meals and get points for zero waste. Data is sent to kitchen for better forecasting.",
        failureReason: "Too ambitious scope. We tried to integrate with 5 differenct POS systems and lost focus on the student experience. Team graduation also killed momentum.",
        failureStage: "Validation",
        author: "Sarah M.",
        school: "MIT",
        stats: { forks: 12, comments: 34, views: 890 }
    },
    {
        id: 2,
        title: "Peer Study Matching",
        category: "EdTech",
        desc: "AI-powered platform to match students for study groups based on learning styles and schedule compatibility.",
        problem: "Students struggle to find compatible study partners for specific niche courses, leading to lower academic performance.",
        solution: "A matching algorithm that considers GPA, learning style (visual/auditory), and availability to form high-performance study pods.",
        failureReason: "Lack of technical skills. The matching algorithm was too complex for our team to build in a weekend, and we couldn't find a technical mentor.",
        failureStage: "Prototype",
        author: "James K.",
        school: "Stanford",
        stats: { forks: 8, comments: 21, views: 654 }
    },
    {
        id: 3,
        title: "Mental Health Check-in Bot",
        category: "Health",
        desc: "Discord bot for anonymous mental health check-ins and peer support in student communities.",
        problem: "University counseling services are often overwhelmed, leaving students with long wait times for basic support.",
        solution: "A lightweight Discord bot that prompts users for daily moods and connects them with anonymous trained peers for immediate talk.",
        failureReason: "No market validation. While we thought students wanted anonymity, many actually preferred face-to-face contact or professional help when in crisis.",
        failureStage: "Ideation",
        author: "Priya S.",
        school: "Berkeley",
        stats: { forks: 23, comments: 45, views: 1240 }
    },
    {
        id: 4,
        title: "Smart Dorm Thermostat",
        category: "Tech",
        desc: "IoT device to optimize dorm room temperature based on occupancy. Failed due to hardware costs.",
        problem: "Heating and cooling empty dorm rooms wastes millions of dollars in university energy costs annually.",
        solution: "A retrofittable smart knob for old dorm radiators that uses motion sensing to lower heat when the student leaves the room.",
        failureReason: "Hardware too expensive. The sensors and motorized valves cost $150 per unit, while the university was only willing to pay $30.",
        failureStage: "Validation",
        author: "Chen W.",
        school: "Georgia Tech",
        stats: { forks: 5, comments: 12, views: 430 }
    },
    {
        id: 5,
        title: "Local Art Marketplace",
        category: "Business",
        desc: "Platform for student artists to sell work to local businesses. Failed to get initial traction.",
        problem: "Student artists produce amazing work but have no professional channel to sell it beyond intermittent student union fairs.",
        solution: "A digital inventory and rental system where local coffee shops and offices can lease student art for their walls.",
        failureReason: "Marketing failure. We focused too much on the artist platform and didn't spend enough time recruiting the businesses to actually buy/rent the art.",
        failureStage: "Launch",
        author: "Emma L.",
        school: "NYU",
        stats: { forks: 2, comments: 8, views: 210 }
    },
    {
        id: 6,
        title: "Micro-Internship Finder",
        category: "Social",
        desc: "Connects students with local non-profits for short-term projects. Team disbanded.",
        problem: "Non-profits need technical help for small tasks (like SEO or social media) but can't afford full-time interns.",
        solution: "A 'gig-economy' platform where students can complete 5-10 hour 'micro-internships' for credit or small stipends.",
        failureReason: "Team conflict. Two founders had a major disagreement about whether the platform should be for-profit or a non-profit itself.",
        failureStage: "Prototype",
        author: "Michael R.",
        school: "UCLA",
        stats: { forks: 15, comments: 28, views: 760 }
    }
];

export const MOCK_REVIEWS = [
    {
        id: 1,
        author: "Elena R.",
        role: "Product Design @ Stanford",
        content: "The feedback I received on my 'failed' final project was more valuable than the grade I got. Two students from MIT helped me realize the market fit was actually in B2B, not consumer.",
        rating: 5,
        likes: 124
    },
    {
        id: 2,
        author: "Marcus T.",
        role: "CS Student @ Georgia Tech",
        content: "I though my spaghetti code project was useless. Someone here forked it, refactored the backend, and now we're co-founders. This platform is a game changer.",
        rating: 5,
        likes: 89
    },
    {
        id: 3,
        author: "Sarah L.",
        role: "Business Major @ NYU",
        content: "Finding a technical co-founder is hard. Finding one by looking at failed projects they're passionate about is genius. I found my CTO here.",
        rating: 5,
        likes: 210
    }
];

export const STORIES = [
    {
        quote: "I submitted my failed hackathon project thinking no one would care. Three months later, a team from another university pivoted it into an actual startup. IdeaRecycle taught me that no idea is truly wasted.",
        author: "Maya Chen",
        role: "Computer Science, Junior",
        school: "Carnegie Mellon"
    },
    {
        quote: "As someone who lacks technical skills but has tons of ideas, this platform finally gave me a way to contribute. I've helped refine market strategies for five different projects so far.",
        author: "David Park",
        role: "Business Administration, Senior",
        school: "UPenn Wharton"
    },
    {
        quote: "The collaborative environment here is incredible. Instead of competition, there's genuine support. My recycled idea got feedback from students across 12 different universities.",
        author: "Aisha Johnson",
        role: "Design & Innovation, Sophomore",
        school: "RISD"
    }
];
