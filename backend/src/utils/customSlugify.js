
// Vanilla JS custom slugify function: string: "Ana are mere" => "ana-are-mere"
const slugify = (input, { maxLen = 90 } = {}) => {
  if (input == null) return "";   // only for null and undefined catching value
  let string = String(input).trim();
  string = string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  string = string.toLowerCase();
  string = string.replace(/[^a-z0-9]+/g, "-");
  string = string.replace(/-+/g, "-").replace(/^-|-$/g, "");
  if (maxLen && string.length > maxLen) {
    string = string.slice(0, maxLen).replace(/-$/g, "");
  }
  return string;
};

// build uniqueSLug and adding suffixes for duplicates  if: string "Ana are mere" exists in db => slugify to "ana-are-mere-2"
const buildUniqueSlug = async (Model, base, { slugField = "slug", excludeId = null, maxLen = 90 } = {}) => {
  const baseSlug = slugify(base, { maxLen });
  if (!baseSlug) return "";

  const filterBase = excludeId
    ? { [slugField]: baseSlug, _id: { $ne: excludeId } }
    : { [slugField]: baseSlug };

  const existsBase = await Model.exists(filterBase);
  if (!existsBase) return baseSlug;

  for (let i = 2; i < 1000; i++) {
    const suffix = `-${i}`;
    const trimmedBase = baseSlug.slice(0, Math.max(0, maxLen - suffix.length)).replace(/-$/g, "");
    const candidate = `${trimmedBase}${suffix}`;

    const filter = excludeId
      ? { [slugField]: candidate, _id: { $ne: excludeId } }
      : { [slugField]: candidate };

    const exists = await Model.exists(filter);
    if (!exists) return candidate;
  }

  // fallback random
  const random = Math.random().toString(36).slice(2, 8);
  const suffix = `-${random}`;
  const trimmedBase = baseSlug.slice(0, Math.max(0, maxLen - suffix.length)).replace(/-$/g, "");
  return `${trimmedBase}${suffix}`;
};

module.exports = { slugify, buildUniqueSlug };
