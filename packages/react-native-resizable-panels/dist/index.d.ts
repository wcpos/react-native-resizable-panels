import React from 'react';
import { ViewProps, StyleProp, ViewStyle } from 'react-native';

type PanelOnCollapse = () => void;
type PanelOnExpand = () => void;
type PanelOnResize = (size: number, prevSize: number | undefined) => void;
type PanelCallbacks = {
    onCollapse?: PanelOnCollapse;
    onExpand?: PanelOnExpand;
    onResize?: PanelOnResize;
};
type PanelConstraints = {
    collapsedSize?: number;
    collapsible?: boolean;
    defaultSize?: number;
    maxSize?: number;
    minSize?: number;
};
type PanelData = {
    callbacks: PanelCallbacks;
    constraints: PanelConstraints;
    id: string;
    idIsFromProps: boolean;
    order?: number;
};
type ImperativePanelHandle = {
    collapse: () => void;
    expand: (minSize?: number) => void;
    getId(): string;
    getSize(): number;
    isCollapsed: () => boolean;
    isExpanded: () => boolean;
    resize: (size: number) => void;
};
type PanelProps = ViewProps & {
    collapsedSize?: number;
    collapsible?: boolean;
    defaultSize?: number;
    id?: string;
    maxSize?: number;
    minSize?: number;
    onCollapse?: PanelOnCollapse;
    onExpand?: PanelOnExpand;
    onResize?: PanelOnResize;
    order?: number;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
    panelRef?: React.Ref<ImperativePanelHandle>;
};
declare function Panel({ children, collapsedSize, collapsible, defaultSize, id: idFromProps, maxSize, minSize, onCollapse, onExpand, onResize, order, style: styleFromProps, panelRef, ...viewProps }: PanelProps): React.JSX.Element;

type Direction = "horizontal" | "vertical";

type ImperativePanelGroupHandle = {
    getId: () => string;
    getLayout: () => number[];
    setLayout: (layout: number[]) => void;
};
type PanelGroupOnLayout = (layout: number[]) => void;
interface PanelGroupStorage {
    getItem(name: string): string | null;
    setItem(name: string, value: string): void;
}
interface PanelGroupProps extends Omit<ViewProps, 'onLayout'> {
    autoSaveId?: string | null;
    direction: Direction;
    onLayout?: (layout: number[]) => void;
    style?: StyleProp<ViewStyle>;
}
declare function PanelGroup({ autoSaveId, children, direction, onLayout, style, ...viewProps }: PanelGroupProps, forwardedRef: React.ForwardedRef<ImperativePanelGroupHandle>): React.JSX.Element;

type PanelResizeHandleOnDragging = (isDragging: boolean) => void;
type PanelResizeHandleProps = {
    /**
     * An optional style to apply to the handle View.
     * By default, we give it a thin touchable bar that spans the full cross‐axis.
     */
    style?: StyleProp<ViewStyle>;
    /** If true, the handle is disabled (no gestures). */
    disabled?: boolean;
    /**
     * The two panel indices that this handle sits between.
     * E.g. if this handle is between panels 1 and 2, pass [1, 2].
     */
    pivotIndices: [number, number];
    /**
     * A callback that is called when the handle is dragged.
     */
    onDragging?: PanelResizeHandleOnDragging;
};
/**
 * A draggable handle between two panels. Uses React Native Gesture Handler
 * with GestureDetector + Gesture.Pan().
 */
declare function PanelResizeHandle({ style, disabled, pivotIndices, onDragging, ...viewProps }: PanelResizeHandleProps): React.JSX.Element;

declare const DATA_ATTRIBUTES: {
    readonly group: "data-panel-group";
    readonly groupDirection: "data-panel-group-direction";
    readonly groupId: "data-panel-group-id";
    readonly panel: "data-panel";
    readonly panelCollapsible: "data-panel-collapsible";
    readonly panelId: "data-panel-id";
    readonly panelSize: "data-panel-size";
    readonly resizeHandle: "data-resize-handle";
    readonly resizeHandleActive: "data-resize-handle-active";
    readonly resizeHandleEnabled: "data-panel-resize-handle-enabled";
    readonly resizeHandleId: "data-panel-resize-handle-id";
    readonly resizeHandleState: "data-resize-handle-state";
};

declare function usePanelGroupContext(): {
    direction: "horizontal" | "vertical" | undefined;
    groupId: string | undefined;
};

declare function assert(expectedCondition: any, message: string): asserts expectedCondition;

declare function setNonce(value: string | null): void;

declare function getPanelElement(id: string, scope?: ParentNode | HTMLElement): HTMLElement | null;

declare function getPanelElementsForGroup(groupId: string, scope?: ParentNode | HTMLElement): HTMLElement[];

declare function getPanelGroupElement(id: string, rootElement?: ParentNode | HTMLElement): HTMLElement | null;

declare function getResizeHandleElement(id: string, scope?: ParentNode | HTMLElement): HTMLElement | null;

declare function getResizeHandleElementIndex(groupId: string, id: string, scope?: ParentNode | HTMLElement): number | null;

declare function getResizeHandleElementsForGroup(groupId: string, scope?: ParentNode | HTMLElement): HTMLElement[];

declare function getResizeHandlePanelIds(groupId: string, handleId: string, panelsArray: PanelData[], scope?: ParentNode | HTMLElement): [idBefore: string | null, idAfter: string | null];

interface Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
}

declare function getIntersectingRectangle(rectOne: Rectangle, rectTwo: Rectangle, strict: boolean): Rectangle;

declare function intersects(rectOne: Rectangle, rectTwo: Rectangle, strict: boolean): boolean;

export { DATA_ATTRIBUTES, type ImperativePanelGroupHandle, type ImperativePanelHandle, Panel, PanelGroup, type PanelGroupOnLayout, type PanelGroupProps, type PanelGroupStorage, type PanelOnCollapse, type PanelOnExpand, type PanelOnResize, type PanelProps, PanelResizeHandle, type PanelResizeHandleOnDragging, type PanelResizeHandleProps, assert, getIntersectingRectangle, getPanelElement, getPanelElementsForGroup, getPanelGroupElement, getResizeHandleElement, getResizeHandleElementIndex, getResizeHandleElementsForGroup, getResizeHandlePanelIds, intersects, setNonce, usePanelGroupContext };
