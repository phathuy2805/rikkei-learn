import { describe, expect, it } from 'vitest'
import {
    getStatusBadgeProps,
    removeVietnameseTones,
} from '../utils/helper.utils'

describe('removeVietnameseTones', () => {
    it('chuyển chữ thường tiếng Việt về không dấu', () => {
        expect(removeVietnameseTones('nguyễn văn an')).toBe('nguyen van an')
    })

    it('chuyển chữ hoa tiếng Việt về không dấu chữ thường', () => {
        expect(removeVietnameseTones('NGUYỄN VĂN AN')).toBe('nguyen van an')
    })

    it('xử lý đ/Đ thành d/D', () => {
        expect(removeVietnameseTones('đỗ mạnh cường')).toBe('do manh cuong')
        expect(removeVietnameseTones('Đỗ Mạnh Cường')).toBe('do manh cuong')
    })

    it('chuỗi không dấu vẫn giữ nguyên (lowercase + trim)', () => {
        expect(removeVietnameseTones('nguyen van a')).toBe('nguyen van a')
    })

    it('loại bỏ khoảng trắng đầu/cuối', () => {
        expect(removeVietnameseTones('  trần thị bình  ')).toBe('tran thi binh')
    })

    it('chuỗi rỗng trả về rỗng', () => {
        expect(removeVietnameseTones('')).toBe('')
    })

    it('xử lý tổ hợp dấu phức tạp: Hoàng, Hương, Tuấn', () => {
        expect(removeVietnameseTones('Hoàng Văn Đức')).toBe('hoang van duc')
        expect(removeVietnameseTones('Lê Thị Hương')).toBe('le thi huong')
        expect(removeVietnameseTones('Phạm Minh Tuấn')).toBe('pham minh tuan')
    })

    it('tìm kiếm không dấu khớp với chuỗi có dấu', () => {
        const employees = ['Trần Văn An', 'Nguyễn Thị Bình', 'Lê Thị Hương']
        const search = 'an'
        const result = employees.filter((name) =>
            removeVietnameseTones(name).includes(search),
        )
        expect(result).toContain('Trần Văn An')
        expect(result).not.toContain('Nguyễn Thị Bình')
    })
})

describe('getStatusBadgeProps', () => {
    it('ACTIVE trả về label "Đang làm"', () => {
        const props = getStatusBadgeProps('ACTIVE')
        expect(props.label).toBe('Đang làm')
        expect(props.variant).toBe('default')
    })

    it('INACTIVE trả về label "Đã nghỉ"', () => {
        const props = getStatusBadgeProps('INACTIVE')
        expect(props.label).toBe('Đã nghỉ')
        expect(props.variant).toBe('secondary')
    })

    it('ON_LEAVE trả về label "Nghỉ phép"', () => {
        const props = getStatusBadgeProps('ON_LEAVE')
        expect(props.label).toBe('Nghỉ phép')
        expect(props.variant).toBe('default')
    })

    it('status không xác định trả về label chính là status đó', () => {
        const props = getStatusBadgeProps('UNKNOWN_STATUS')
        expect(props.label).toBe('UNKNOWN_STATUS')
        expect(props.variant).toBe('secondary')
    })

    it('ACTIVE có className chứa màu xanh emerald', () => {
        const props = getStatusBadgeProps('ACTIVE')
        expect(props.className).toContain('emerald')
    })

    it('ON_LEAVE có className chứa màu vàng amber', () => {
        const props = getStatusBadgeProps('ON_LEAVE')
        expect(props.className).toContain('amber')
    })

    it('INACTIVE có className chứa slate', () => {
        const props = getStatusBadgeProps('INACTIVE')
        expect(props.className).toContain('slate')
    })
})
