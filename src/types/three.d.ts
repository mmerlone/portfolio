declare module "three" {
  export function setConsoleFunction(
    fn: (type: string, message: string, ...params: unknown[]) => void,
  ): void;

  export function getConsoleFunction():
    | ((type: string, message: string, ...params: unknown[]) => void)
    | null;

  export class Object3D {
    add(...objects: Object3D[]): this;
    remove(...objects: Object3D[]): this;
  }

  export class Color {
    constructor(value: string | number);
  }

  export class Fog {
    constructor(color: string | number, near: number, far: number);
  }

  export class Vector3 {
    constructor(x?: number, y?: number, z?: number);
    x: number;
    y: number;
    z: number;
    set(x: number, y: number, z: number): this;
  }

  export class Scene extends Object3D {
    fog: Fog | null;
  }

  export class PerspectiveCamera extends Object3D {
    constructor(fov: number, aspect: number, near: number, far: number);
  }

  export class AmbientLight extends Object3D {
    constructor(color?: string | number, intensity?: number);
  }

  export class DirectionalLight extends Object3D {
    position: Vector3;
    constructor(color?: string | number, intensity?: number);
  }

  export class PointLight extends Object3D {
    position: Vector3;
    constructor(color?: string | number, intensity?: number);
  }
}
