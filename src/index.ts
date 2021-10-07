const formData: FormData = new FormData();

export default function objectToFormData(object: Record<string, any>) {
  processObject(object);

  return formData;
}

export function processObject(object: Record<string, any>, currentKey = '') {
  if (object) {
    if (Array.isArray(object)) {

      object.forEach(function (value: any, index: any) {
        const key = createKey(index, currentKey);

        appendToKey(key, value);
      });

      return;
    }

    Object.keys(object).forEach((property: string) => {
      const key = createKey(property, currentKey);

      appendToKey(key, object[property]);
    });
  }
}

function createKey(propOrIndex: string, currentKey = '') {
  return currentKey ? `${currentKey}[${propOrIndex}]` : propOrIndex;
}

function appendToKey(key: string, value: any) {
  if (typeof value === 'object') {
    processObject(value, key);

    return;
  }
    
  appendData(value, key);
}

function appendData(key: string, value: any) {
  formData.append(key, value);
}