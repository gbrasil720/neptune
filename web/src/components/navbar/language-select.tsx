import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FlagBR from "../flags/flag-br";
import FlagUS from "../flags/flag-us";

export function LanguageSelect() {
  return (
    <Select defaultValue="english">
      <SelectTrigger className="w-40">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="english">
          <div className="flex items-center gap-3">
            <FlagUS className="size-4" />
            English
          </div>
        </SelectItem>
        <SelectItem value="portuguese">
          <div className="flex items-center gap-3">
            <FlagBR className="size-4" />
            Portuguese
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
