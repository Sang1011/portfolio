import { getProjectBySlug } from '@/lib/data'
import { notFound } from 'next/navigation'
import ProjectDetailPage from './ProjectDetail'

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const project = getProjectBySlug(slug)
    if (!project) notFound()

    return <ProjectDetailPage slug={slug} />
}