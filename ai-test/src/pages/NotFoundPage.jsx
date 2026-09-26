import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader.jsx';

export function NotFoundPage() {
  return (
    <PageHeader
      eyebrow="404"
      title="Page not found"
      description="This page may have moved, or the address may be incorrect."
      action={
        <Link className="button button--primary" to="/">
          Back to overview
        </Link>
      }
    />
  );
}
