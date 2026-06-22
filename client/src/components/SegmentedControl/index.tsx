import { Group } from "@mantine/core";
import { ReactNode } from "react";
import Button from "../Button";

interface Segment<T extends string> {
  icon?: ReactNode;
  label: string;
  value: T;
}

interface SegmentedControlProps<T extends string> {
  ariaLabel: string;
  fullWidth?: boolean;
  mb?: string | number;
  onChange: (value: T) => void;
  options: Segment<T>[];
  value: T;
}

const SegmentedControl = <T extends string>({
  ariaLabel,
  fullWidth = false,
  mb = "xl",
  onChange,
  options,
  value,
}: SegmentedControlProps<T>) => {
  return (
    <Group
      aria-label={ariaLabel}
      bg="var(--mantine-color-body)"
      gap={4}
      justify="center"
      mb={mb}
      p={4}
      role="group"
      style={{
        border: "1px solid var(--mantine-color-default-border)",
        borderRadius: "var(--mantine-radius-lg)",
        boxShadow: "var(--mantine-shadow-sm)",
        width: fullWidth ? "100%" : "fit-content",
        maxWidth: "100%",
        marginInline: "auto",
      }}
    >
      {options.map((option) => (
        <Button
          aria-pressed={option.value === value}
          key={option.value}
          onClick={() => onChange(option.value)}
          style={fullWidth ? { flex: 1 } : undefined}
          variant={option.value === value ? "primary" : "ghost"}
        >
          {option.icon}
          {option.label}
        </Button>
      ))}
    </Group>
  );
};

export default SegmentedControl;
