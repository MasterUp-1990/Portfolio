import { getContent } from '@/lib/getContent';
import Site from '@/components/site/Site';

export default async function Page() {
  const content = await getContent();
  return <Site content={content} />;
}
