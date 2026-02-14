export const analyzeTrends = (entries) => {
    // Sort by date descending to get recent entries
    const sorted = [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));

    if (sorted.length < 3) {
        return {
            status: 'insufficient_data',
            message: "Keep tracking for at least 3 days to get a personalized analysis.",
            color: 'text-slate-500'
        };
    }

    const recent = sorted.slice(0, 3);

    // Calculate averages
    const avgMood = recent.reduce((sum, e) => sum + Number(e.mood), 0) / 3;
    const avgPain = recent.reduce((sum, e) => sum + Number(e.pain), 0) / 3;
    const avgSleep = recent.reduce((sum, e) => sum + Number(e.sleep), 0) / 3;

    // Rule-based Analysis
    // Condition 1: High Risk (Low Mood OR High Pain)
    if (avgMood < 4 || avgPain > 7) {
        return {
            status: 'consult_doctor',
            title: "We recommend consulting a healthcare provider",
            message: "Your recent logs indicate persistent low mood or high pain levels. It is important to prioritize your well-being and speak to a professional.",
            color: 'bg-red-50 text-red-700 border-red-200'
        };
    }

    // Condition 2: Moderate Risk (Low Sleep)
    if (avgSleep < 5) {
        return {
            status: 'needs_rest',
            title: "Focus on Rest",
            message: "You haven't been getting much sleep lately. Sleep deprivation can significantly affect mood. Please ask for support from family or friends to get some rest.",
            color: 'bg-orange-50 text-orange-700 border-orange-200'
        };
    }

    // Condition 3: Doing Well
    return {
        status: 'doing_well',
        title: "You are doing great!",
        message: "Your trends look stable. Motherhood is a journey, and you are handling it one day at a time. Keep going!",
        color: 'bg-green-50 text-green-700 border-green-200'
    };
};
