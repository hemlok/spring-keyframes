import * as React from "react"
import { Transforms } from "./createTransformString"

export type FrameNumber = number
export type ScaleProperty = "scale" | "scaleX" | "scaleY"
export type CSSProperty = keyof Omit<React.CSSProperties, "transition" | "scale" | "rotate">
export type CSSFrame = [CSSProperty, number | string]
export type Keyframe = [FrameNumber, string]
export type Property = CSSProperty | TransformProperty
export type TransformProperty =
  | "x"
  | "y"
  | "z"
  | "rotate"
  | "rotateX"
  | "rotateY"
  | "rotateZ"
  | "scale"
  | "scaleX"
  | "scaleY"
  | "scaleZ"
export type TransformFrame = [TransformProperty, number]
export type KeyframeItem = [string, number | string]
export type ScaleFrame = [ScaleProperty, number]
export type Properties = CSSProperty | TransformProperty
export type Frame = Partial<Record<Properties, string | number>>

export type Delta =
  | {
      scaleX: number
      scaleY: number
    }
  | number

export type InvertedFrame = Partial<Record<ScaleProperty, number>>

export interface InvertedAnimation {
  from: InvertedFrame
  to: InvertedFrame
}

export interface Options {
  stiffness?: number
  damping?: number
  mass?: number
  precision?: number
  velocity?: number
  tweened?: Properties[]
  withInvertedScale?: boolean
  withInversion?: boolean
  invertedAnimation?: InvertedAnimation
}
