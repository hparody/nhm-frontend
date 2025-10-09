type Mapping<Source, Target> = {
  [K in keyof Partial<Source>]: keyof Partial<Target>;
};

/**
 * Function to map an object keys into new ones given a mapping JSON
 * @param obj Object to map as { [sourceKey] : value }
 * @param mapping Mapping object as { [sourceKey] : targetKey }
 * @returns Mapped object as { [targetKey] : value }
 */
function mapObject<
  Source extends Record<string, any>,
  Target extends Record<string, any>,
  M extends Mapping<Source, Target>,
>(object: Source, mapping: M): Target {
  const result = {} as Target;
  for (const key in mapping) {
    const targetKey = mapping[key];
    (result as any)[targetKey] = object[key] ?? "";
  }
  return result;
}

export default mapObject;
