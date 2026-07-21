export function removeVietnameseTones(str: string): string {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D')
        .toLowerCase()
        .trim()
}
export const getStatusBadgeProps = (status: string) => {
    switch (status) {
        case 'ACTIVE':
            return {
                variant: 'default' as const,
                className:
                    'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
                label: 'Đang làm',
            }
        case 'INACTIVE':
            return {
                variant: 'secondary' as const,
                className: 'bg-slate-800 text-slate-400 border-slate-700',
                label: 'Đã nghỉ',
            }
        case 'ON_LEAVE':
            return {
                variant: 'default' as const,
                className: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
                label: 'Nghỉ phép',
            }
        default:
            return {
                variant: 'secondary' as const,
                className: '',
                label: status,
            }
    }
}
