import { describe, expect, it } from "vitest";
import { act3Content, act3Dialogue, act3Quest } from "./content";

describe("act three content", () => {
  it("uses the approved 36 by 26 kitchen map", () => {
    expect(act3Content.map.size).toEqual({ width: 36, height: 26 });
    expect(act3Content.map.tileSize).toBe(32);
  });

  it("contains the three independent ingredients", () => {
    expect(
      act3Content.interactables
        .filter((item) => item.material !== undefined)
        .map((item) => item.material)
    ).toEqual(["bowl", "noodles", "laojiu"]);
  });

  it("names every person in Chinese", () => {
    const lines = Object.values(act3Content.dialogue.groups).flat();
    expect(lines.some((line) => line.speakerName === "阿珍")).toBe(true);
    expect(lines.some((line) => line.speakerName === "太婆")).toBe(true);
  });

  it("provides the required quest content", () => {
    for (const id of [
      "act3_talk_family",
      "act3_collect",
      "act3_cook",
      "act3_serve",
      "act3_inscription",
      "act3_complete"
    ]) {
      expect(act3Quest(id).id).toBe(id);
    }
  });

  it("keeps the serving dialogue before the inscription choice", () => {
    expect(act3Dialogue("serve").at(-1)?.text).toContain(
      "这碗面线"
    );
  });
});
