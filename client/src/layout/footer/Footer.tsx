import "./style.scss"

export default function Footer() {
  return (
    <div>
      <footer>
        <p>© {new Date().getFullYear()} Pearl Team. All rights reserved.</p>
      </footer>
    </div>
  );
}
