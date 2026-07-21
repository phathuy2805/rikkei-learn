import { X } from 'lucide-react'
import * as React from 'react'
import { cn } from '../../lib/utils'

interface ModalProps {
    open: boolean
    onClose: () => void
    title: string
    children: React.ReactNode
    className?: string
}

export function Modal({
    open,
    onClose,
    title,
    children,
    className,
}: ModalProps) {
    if (!open) return null

    return (
        /* Lớp nền Backdrop (Kích hoạt onClose khi click ra ngoài) */
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in-0"
        >
            {/* Khung Modal chính (Ngăn sự kiện click lan ra lớp nền bằng e.stopPropagation()) */}
            <div
                onClick={(e) => e.stopPropagation()}
                className={cn(
                    'w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100 flex flex-col max-h-[90vh]',
                    className,
                )}
            >
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
                    <h3 className="text-lg font-bold text-slate-100">
                        {title}
                    </h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 overflow-y-auto flex-1">{children}</div>
            </div>
        </div>
    )
}
