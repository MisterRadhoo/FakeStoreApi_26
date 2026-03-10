const { z } = require("zod");

// @desc Pagination zod validator schema
const zPaginationSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(60).optional().default(12),
  sort: z.string().optional().default("-createdAt"),
}).strict();

module.exports = zPaginationSchema;