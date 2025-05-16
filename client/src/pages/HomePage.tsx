import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <PageHeader
        title="Welcome to BabyHub"
        subtitle="Connect with trusted babysitters and find the perfect match for your family."
      />

      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Join us today and find the perfect babysitter for your needs!</p>
        <button className="cta-button">
          <Link to="/login">Get Started</Link>
        </button>
      </section>
    </>
  );
}
