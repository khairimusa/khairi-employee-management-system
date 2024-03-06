import { Label } from '@/components/new-york/ui/label';
import { Switch } from '@/components/new-york/ui/switch';

export default function SwitchDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  );
}
