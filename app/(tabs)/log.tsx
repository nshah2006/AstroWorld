import { useMemo, useState } from "react";

import type { ObservationObject, WeatherCondition } from "@/lib/types";
import {
  LogConditionEditor,
  LogEquipmentPicker,
  LogFlowControls,
  LogFlowStepHeader,
  LogObjectPicker,
  LogReviewStep,
  Screen,
  ThemedText,
} from "@/components/ui";
import { getMockCelestialObjects, getMockTonightSky } from "@/mocks";
import { useProfileStore, useSessionDraftStore } from "@/store";

export default function LogScreen() {
  type LogStep = 1 | 2 | 3 | 4;
  const totalSteps = 4;
  const [step, setStep] = useState<LogStep>(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const defaultWeather = getMockTonightSky().conditions;
  const [weather, setWeather] = useState<WeatherCondition>(defaultWeather);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedObjectIds, setSelectedObjectIds] = useState<string[]>([]);
  const [selectedEquipmentIds, setSelectedEquipmentIds] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [shareToCommunity, setShareToCommunity] = useState(false);

  const currentUser = useProfileStore((state) => state.currentUser);
  const setDraftWeather = useSessionDraftStore((state) => state.setWeather);
  const addObservedObject = useSessionDraftStore((state) => state.addObservedObject);
  const addEquipment = useSessionDraftStore((state) => state.addEquipment);
  const setDraftNotes = useSessionDraftStore((state) => state.setNotes);
  const setDraftShareToCommunity = useSessionDraftStore((state) => state.setShareToCommunity);
  const clearDraft = useSessionDraftStore((state) => state.clearDraft);

  const allObjects = getMockCelestialObjects();
  const filteredObjects = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) {
      return allObjects;
    }

    return allObjects.filter((observationObject) => {
      const nameMatches = observationObject.name.toLowerCase().includes(normalizedQuery);
      const catalogMatches = observationObject.catalogLabel.toLowerCase().includes(normalizedQuery);
      return nameMatches || catalogMatches;
    });
  }, [allObjects, searchQuery]);

  const toggleObject = (objectId: string) => {
    setSelectedObjectIds((currentIds) =>
      currentIds.includes(objectId) ? currentIds.filter((id) => id !== objectId) : [...currentIds, objectId],
    );
  };

  const toggleEquipment = (equipmentId: string) => {
    setSelectedEquipmentIds((currentIds) =>
      currentIds.includes(equipmentId) ? currentIds.filter((id) => id !== equipmentId) : [...currentIds, equipmentId],
    );
  };

  const handleSubmit = () => {
    clearDraft();
    setDraftWeather(weather);
    allObjects
      .filter((observationObject) => selectedObjectIds.includes(observationObject.id))
      .forEach((observationObject: ObservationObject) => addObservedObject(observationObject));
    currentUser.equipment
      .filter((equipmentItem) => selectedEquipmentIds.includes(equipmentItem.id))
      .forEach((equipmentItem) => addEquipment(equipmentItem));
    setDraftNotes(note);
    setDraftShareToCommunity(shareToCommunity);
    clearDraft();
    setIsSubmitted(true);
  };

  const handleResetAfterSuccess = () => {
    setStep(1);
    setIsSubmitted(false);
    setWeather(defaultWeather);
    setSearchQuery("");
    setSelectedObjectIds([]);
    setSelectedEquipmentIds([]);
    setNote("");
    setShareToCommunity(false);
  };

  const stepTitleByStep = {
    1: {
      title: "Conditions",
      subtitle: "Auto-filled from tonight's sky. Adjust if needed.",
    },
    2: {
      title: "Observed objects",
      subtitle: "Search and select what you observed.",
    },
    3: {
      title: "Equipment",
      subtitle: "Choose gear used in this session.",
    },
    4: {
      title: "Notes and share",
      subtitle: "Add optional notes and sharing preference.",
    },
  } as const;

  return (
    <Screen spaced>
      {isSubmitted ? (
        <>
          <ThemedText size="xl" weight="semibold">
            Session saved
          </ThemedText>
          <ThemedText tone="muted">Your observation draft was written locally and completed offline.</ThemedText>
          <LogFlowControls
            isFirstStep
            isLastStep
            onBack={handleResetAfterSuccess}
            onNext={handleResetAfterSuccess}
            onSubmit={handleResetAfterSuccess}
          />
        </>
      ) : (
        <>
          <LogFlowStepHeader
            currentStep={step}
            totalSteps={totalSteps}
            title={stepTitleByStep[step].title}
            subtitle={stepTitleByStep[step].subtitle}
          />

          {step === 1 ? <LogConditionEditor weather={weather} onChange={setWeather} /> : null}
          {step === 2 ? (
            <LogObjectPicker
              objects={filteredObjects}
              selectedObjectIds={selectedObjectIds}
              searchQuery={searchQuery}
              onSearchQueryChange={setSearchQuery}
              onToggleObject={toggleObject}
            />
          ) : null}
          {step === 3 ? (
            <LogEquipmentPicker
              equipment={currentUser.equipment}
              selectedEquipmentIds={selectedEquipmentIds}
              onToggleEquipment={toggleEquipment}
            />
          ) : null}
          {step === 4 ? (
            <LogReviewStep
              note={note}
              shareToCommunity={shareToCommunity}
              onNoteChange={setNote}
              onToggleShareToCommunity={() => setShareToCommunity((currentValue) => !currentValue)}
            />
          ) : null}

          <LogFlowControls
            isFirstStep={step === 1}
            isLastStep={step === totalSteps}
            onBack={() =>
              setStep((currentStep) => (Math.max(1, currentStep - 1) as LogStep))
            }
            onNext={() =>
              setStep((currentStep) => (Math.min(totalSteps, currentStep + 1) as LogStep))
            }
            onSubmit={handleSubmit}
          />
        </>
      )}
    </Screen>
  );
}
