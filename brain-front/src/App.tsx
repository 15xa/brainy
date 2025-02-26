import { Button } from "./components/ui/Button";

export default function App() {
  return (
    <div className="p-4">
      <Button title="Click Me" size="md" variant="primary" />
      <Button title="Next" size="lg" variant="secondary" startIcon={<span>🔥</span>} />
    </div>
  );
}
