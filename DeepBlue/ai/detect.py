from ultralytics import YOLO
import json

# Load pretrained YOLOv8 nano model (fast, small)
model = YOLO("yolov8n.pt")

def run_detection(image_path="data/images/sample_ship.jpg", save_json="data/detection.json"):
    results = model(image_path)
    detections = []

    for r in results:
        for box in r.boxes:
            detections.append({
                "x": float(box.xyxy[0][0]),
                "y": float(box.xyxy[0][1]),
                "width": float(box.xyxy[0][2] - box.xyxy[0][0]),
                "height": float(box.xyxy[0][3] - box.xyxy[0][1]),
                "confidence": float(box.conf[0]),
                "class": model.names[int(box.cls[0])]
            })

    # Save results
    with open(save_json, "w") as f:
        json.dump({"detections": detections}, f, indent=2)

    return {"detections": detections}

if __name__ == "__main__":
    print(run_detection())
