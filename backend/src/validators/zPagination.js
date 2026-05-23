const { z } = require("zod");

// @desc Pagination zod validator schema
const zPaginationSchema = z.strictObject({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(200).optional().default(12),
  sort: z.string().optional().default("-createdAt"),
});

module.exports = zPaginationSchema;