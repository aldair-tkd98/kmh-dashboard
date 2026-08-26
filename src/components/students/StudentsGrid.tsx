import type { Student } from '@/types/student'
import { StudentCard } from '@/components/students/StudentCard'

interface StudentsGridProps {
  students: Student[]
}

export function StudentsGrid({ students }: StudentsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {students.map((student) => (
        <StudentCard key={student.id} student={student} />
      ))}
    </div>
  )
}
