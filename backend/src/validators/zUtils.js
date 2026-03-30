// zod helper function
// Normalize text:  electrOniCs DeviCes to => Electronics devices...
const normalizeText = (value) => {
    const normalizedValue = value.trim().replace(/\s+/g, " ").toLowerCase();
    if (!normalizedValue) {
        return normalizedValue;
    }
    return normalizedValue.charAt(0).toUpperCase() + normalizedValue.slice(1);
};

module.exports = { normalizeText };