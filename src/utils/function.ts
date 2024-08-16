import { Meta } from '@/decorators/types';

export function genMeta(counts = 0, limit = 10, page = 1): Meta {
  return {
    limit,
    page,
    totalItems: counts,
    totalPages: Math.ceil(counts / limit),
  };
}
