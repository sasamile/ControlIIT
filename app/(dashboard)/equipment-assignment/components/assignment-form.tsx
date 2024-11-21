"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FileIcon, Loader2, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { AssignmentSchema } from "@/schemas/assignment";
import { classes, locations, statuses, subclasses } from "@/constants";
import { Inventory, User } from "@prisma/client";
import { UserAvatar } from "@/components/common/user-avatar";
import { createAssignment, updateAssignment } from "@/actions/assignment";
import { AssignmentColum } from "./columns";
import { Label } from "@/components/ui/label";
import { uploadFile } from "@/actions/uploadthing/uploadthing-actions";

type FormValues = z.infer<typeof AssignmentSchema>;

interface AssignmentFormProps {
  initialData?: AssignmentColum;
  closeDialog: () => void;
  users: User[];
  elements: Inventory[];
}

export function AssignmentForm({
  initialData,
  users,
  elements,
  closeDialog,
}: AssignmentFormProps) {
  const [isLoading, startTransition] = useTransition();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showExistingImage, setShowExistingImage] = useState(true);

  useEffect(() => {
    if (initialData?.elementImage && showExistingImage) {
      setPreviewUrl(initialData.elementImage);
    }
  }, [initialData, showExistingImage]);

  const form = useForm<FormValues>({
    resolver: zodResolver(AssignmentSchema),
    defaultValues: {
      responsibleId: initialData?.responsibleId || "",
      elementId: initialData?.elementId || "",
      reference: initialData?.referencia || "",
      serial: initialData?.serial || "",
      owner: initialData?.propietario || "",
      location: initialData?.ubicación || "",
      status: initialData?.estado || "",
      observations: initialData?.observaciones || "",
      availability: initialData?.disponibilidad || "",
      quantity: initialData?.cantidad || 1,
    },
  });

  const { isValid } = form.formState;

  const handleSubmit = async (values: FormValues) => {
    try {
      let imageUrl = null;

      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const response = await uploadFile(formData);

        if (!response?.success) {
          toast.error("Error al subir la imagen");
          return;
        }

        imageUrl = response.fileUrl;
      } else if (initialData?.elementImage && showExistingImage) {
        // Mantener la imagen existente si no se selecciona una nueva
        imageUrl = initialData.elementImage;
      }

      if (!initialData) {
        createAssignmentFunction(values, imageUrl ?? "");
      } else {
        updateAssignmentFunction(initialData.id, values, imageUrl ?? "");
      }
    } catch (error) {
      toast.error("Error", {
        description: "Algo salió mal en el proceso",
      });
    }
  };

  const createAssignmentFunction = (values: FormValues, imageUrl: string) => {
    startTransition(async () => {
      try {
        const { error, success } = await createAssignment(values, imageUrl);

        if (error) {
          toast.error("Algo salió mal", {
            description: error,
          });
        }

        if (success) {
          closeDialog();
          toast.success("Proceso completado", {
            description: success,
          });
          form.reset();
        }
      } catch (error) {
        toast.error("Error", {
          description: "Algo salió mal en el proceso",
        });
      }
    });
  };

  const updateAssignmentFunction = (
    assignmentId: string,
    values: FormValues,
    imageUrl: string
  ) => {
    startTransition(async () => {
      try {
        const { error, success } = await updateAssignment(
          assignmentId,
          values,
          imageUrl
        );

        if (error) {
          toast.error("Algo salió mal", {
            description: error,
          });
        }

        if (success) {
          toast.success("Proceso completado", {
            description: success,
          });
          closeDialog();
        }
      } catch (error) {
        toast.error("Error", {
          description: "Algo salió mal en el proceso",
        });
      }
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      setSelectedFile(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    } else {
      alert("Por favor, selecciona una imagen PNG o JPEG válida.");
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setShowExistingImage(false); // Añadir esta línea
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 px-6 pb-6"
      >
        <FormField
          control={form.control}
          name="responsibleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Responsable *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar responsable" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[250px]">
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      <div className="flex items-center gap-3">
                        <UserAvatar src={user.image!} />
                        <p>{user.name}</p>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="elementId"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Elemento</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar elemento" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[250px]">
                  {elements.map((element) => (
                    <SelectItem
                      disabled={element.availableQuantity === 0}
                      key={element.id}
                      value={element.id}
                    >
                      <div className="flex items-center gap-3">
                        <p>
                          {element.element} {`(${element.brand})`}
                        </p>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full mx-auto space-y-2">
          <Label className="text-muted-foreground font-medium">
            Imagen del equipo o elemento
          </Label>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleButtonClick}
              className="flex items-center gap-2 w-full"
            >
              <FileIcon className="size-4" />
              <span>Subir imagen</span>
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/png,image/jpeg"
              hidden
            />
            {(selectedFile ||
              (initialData?.elementImage && showExistingImage)) && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleRemoveFile}
                className="h-8 w-8 rounded-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-500"
              >
                <XIcon className="w-4 h-4" />
              </Button>
            )}
          </div>
          {selectedFile && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileIcon className="size-4" />
              {selectedFile.name}
            </div>
          )}
          {previewUrl && (
            <div className="relative h-[200px] w-full rounded-lg overflow-hidden border">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cantidad Total</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  {...field}
                  value={field.value === 0 ? "" : field.value} // Mostrar vacío si es 0
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === "" ? 0 : Number(value)); // Manejar vacío
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Referencia</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="serial"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Serial</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="owner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Propietario *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ubicación *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar ubicación" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {locations.map((lc) => (
                    <SelectItem key={lc} value={lc}>
                      {lc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {statuses.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="observations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observaciones</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="availability"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Disponibilidad</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isLoading || !isValid}
          variant="primary"
          type="submit"
        >
          {isLoading && <Loader2 className="size-4 animate-spin" />}
          {!initialData ? "Guardar Asignación" : "Guardar Cambios"}
        </Button>
      </form>
    </Form>
  );
}
