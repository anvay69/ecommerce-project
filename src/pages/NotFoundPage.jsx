import { Link } from 'react-router';
import Header from '../components/Header';
import './NotFoundPage.css';

export default function NotFoundPage() {
  return (
    <>
      <title>Not Found</title>
      <Header />
      <div className="main-container">
      <h1 className="status-code">404</h1>
      <p className="text">
        The page your trying to reach is not available.
        Try going to our <Link className="home-link" to="/">home</Link>.
      </p>
      </div>
    </>
  )
}