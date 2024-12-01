import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function LoadingSkeleton() {
  return (
    <>
      {[...Array(4)].map((_, index) => (
        <Card key={index} className="flex items-center justify-center p-4 m-2">
          <Skeleton className="h-8 w-3/4" />
        </Card>
      ))}
    </>
  )
}

