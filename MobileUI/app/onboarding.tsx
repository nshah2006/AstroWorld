import { useMemo, useState } from "react";
import { Redirect, useRouter } from "expo-router";

import { OnboardingStepView, Screen, ThemedText } from "@/components/ui";
import type { OnboardingStepKind } from "@/components/ui";
import { searchMockEquipmentCatalog } from "@/mocks";
import { useProfileStore } from "@/store";

const onboardingSteps: OnboardingStepKind[] = [
  "value-plan",
  "value-log",
  "value-connect",
  "location-priming",
  "first-telescope",
];

export default function OnboardingScreen() {
  const router = useRouter();
  const isOnboarded = useProfileStore((state) => state.isOnboarded);
  const addEquipmentToProfile = useProfileStore((state) => state.addEquipmentToProfile);
  const completeOnboarding = useProfileStore((state) => state.completeOnboarding);
  const [stepIndex, setStepIndex] = useState(0);
  const [telescopeName, setTelescopeName] = useState("");
  const currentStep = onboardingSteps[stepIndex];
  const totalSteps = onboardingSteps.length;
  const selectedTelescope = useMemo(() => {
    if (!telescopeName.trim()) {
      return undefined;
    }

    return searchMockEquipmentCatalog(telescopeName).find((equipmentItem) => equipmentItem.category === "telescope");
  }, [telescopeName]);

  if (isOnboarded) {
    return <Redirect href="/(tabs)" />;
  }

  const handlePrimaryAction = () => {
    const isLastStep = stepIndex === totalSteps - 1;
    if (!isLastStep) {
      setStepIndex((currentIndex) => currentIndex + 1);
      return;
    }

    if (selectedTelescope) {
      addEquipmentToProfile(selectedTelescope);
    }
    completeOnboarding();
    router.replace("/(tabs)");
  };

  return (
    <Screen spaced>
      <ThemedText size="xl" weight="semibold">
        Welcome
      </ThemedText>
      <OnboardingStepView
        stepIndex={stepIndex + 1}
        totalSteps={totalSteps}
        stepKind={currentStep}
        telescopeName={telescopeName}
        onTelescopeNameChange={setTelescopeName}
        onPrimaryAction={handlePrimaryAction}
        onBack={
          stepIndex > 0
            ? () => {
                setStepIndex((currentIndex) => Math.max(0, currentIndex - 1));
              }
            : undefined
        }
      />
    </Screen>
  );
}
