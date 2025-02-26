import { useActionState } from "react";
import Form from "./Form";
import Input from "./Input";
import InputContainer from "./InputContainer";
import Label from "./Label";
import { useAuthContext } from "../store/auth-context";

async function sendImageRequest(prompt, options, authToken) {
  const response = await fetch("http://localhost:8000/generate-image", {
    method: "POST",
    body: JSON.stringify({ prompt, options }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to generate image, check your input.");
  }

  const imageBlob = await response.blob();
  return URL.createObjectURL(imageBlob);
}

function ImageGeneration() {
  const { token } = useAuthContext();

  async function submitAction(_, formData) {
    const prompt = formData.get("prompt");
    const options = {
      quality: formData.get("quality"),
      aspect_ratio: formData.get("aspectRatio"),
      format: formData.get("format"),
    };

    try {
      const imageUrl = await sendImageRequest(prompt, options, token);
      return { result: "success", imageUrl, prompt };
    } catch (error) {
      return { result: "error", message: error.message };
    }
  }

  const [formState, action, isPending] = useActionState(submitAction, {
    result: null,
  });

  return (
    <div className="flex gap-4 max-w-[70rem] mx-auto items-start">
      <Form
        action={action}
        className="flex flex-col w-[25rem] justify-between gap-8"
      >
        <div className="flex flex-col gap-4">
          <InputContainer>
            <Label htmlFor="prompt">Image Prompt</Label>
            <Input
              type="text"
              id="prompt"
              name="prompt"
              isTextarea
              className="resize-none "
            />
          </InputContainer>
          <div className="flex gap-5">
            <InputContainer>
              <Label htmlFor="quality">Quality</Label>
              <Input
                type="number"
                id="quality"
                name="quality"
                min="1"
                max="100"
                step="1.0"
                defaultValue="80"
                className="w-[4rem]"
              />
            </InputContainer>
            <InputContainer>
              <Label htmlFor="aspectRatio">Aspect Ratio</Label>
              <select
                id="aspectRatio"
                name="aspectRatio"
                defaultValue="1:1"
                className="p-2 rounded-sm w-[6rem] bg-[#060610] border-2 border-[#25232C] text-white focus:border-[#CAFF00] focus:ring-2 focus:ring-[#CAFF00] focus:outline-none hover:border-[#CAFF00]"
              >
                <option value="1:1">1:1</option>
                <option value="16:9">16:9</option>
                <option value="4:3">4:3</option>
              </select>
            </InputContainer>
            <InputContainer>
              <Label htmlFor="format">Format</Label>
              <select
                id="format"
                name="format"
                defaultValue="png"
                className="p-2 rounded-sm w-[5rem] bg-[#060610] border-2 border-[#25232C] text-white focus:border-[#CAFF00] focus:ring-2 focus:ring-[#CAFF00] focus:outline-none hover:border-[#CAFF00]"
              >
                <option value="webp">WebP</option>
                <option value="png">PNG</option>
                <option value="jpg">JPG</option>
              </select>
            </InputContainer>
          </div>
        </div>
        <p className="flex justify-end">
          <button
            disabled={isPending}
            className="bg-[#CAFF00] text-[#151515] font-semibold py-3 rounded-lg hover:border-[#CAFF00] border hover:text-[#CAFF00] hover:bg-transparent disabled:cursor-not-allowed disabled:bg-stone-400 disabled:text-stone-600 px-10 text-lg cursor-pointer"
          >
            {isPending ? "Generating..." : "Generate"}
          </button>
        </p>
      </Form>
      <div className="h-[25rem] flex-1 flex justify-center items-center">
        {!formState.result && (
          <p className="text-stone-400 p-8 font-mono">
            Press &quot;Generate&quot; to generate an image based on your
            prompt.
          </p>
        )}
        {formState.result === "success" && (
          <div className="bg-[#151515] px-4 py-6 rounded-lg flex flex-col gap-3 border-2 border-[#25232C]">
            <img
              src={formState.imageUrl}
              alt={formState.prompt}
              className="h-[25rem] shadow-2xl rounded-md"
            />
          </div>
        )}
        {formState.result === "error" && (
          <p className="text-red-200">{formState.message}</p>
        )}
      </div>
    </div>
  );
}

export default ImageGeneration;
