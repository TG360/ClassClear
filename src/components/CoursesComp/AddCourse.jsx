import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useAuth } from "@/utils/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import './CoursesComp.css';

const AddCourse = () => {
  const [course, setCourse] = useState({
    course_name: '',
    university_name: '',
    instructor_name: '',
    syllabus_file: null,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const { handleAddCourse } = useAuth();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!course.course_name || !course.university_name || !course.instructor_name) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        status: "error",
        style: { borderColor: 'red' },
      });
      return;
    }

    if (course.syllabus_file && course.syllabus_file.type !== "application/pdf") {
      toast({
        title: "Error",
        description: "Only PDF files are allowed.",
        status: "error",
        style: { borderColor: 'red' },
      });
      return;
    }
    console.log(course);
    const result = await handleAddCourse(course);
    if (result.error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: result.error,
        status: "error",
      });
    } else {
      toast({
        title: "Success",
        description: result.success,
        status: "success",
        style: { borderColor: 'green' },
      });
      setIsDialogOpen(false);
    }
  };

  const handleCourseChange = (e) => {
    if (e.target.name === 'syllabus_file') {
      setCourse(prev => ({ ...prev, [e.target.name]: e.target.files[0] }));
    } else {
      setCourse(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleDialogClose = () => {
    setCourse({
      course_name: '',
      university_name: '',
      instructor_name: '',
      syllabus_file: null,
    });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => {
      setIsDialogOpen(open);
      if (!open) {
        handleDialogClose();
      }
    }}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsDialogOpen(true)}>Add Course</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a Course</DialogTitle>
          <DialogDescription>
            Be as specific as possible when adding a course.
          </DialogDescription>
        </DialogHeader>
        <form action="submit" onSubmit={handleFormSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="course" className="text-right">
                Course
              </Label>
              <Input
                id="course"
                placeholder="CSCE-120"
                className="col-span-3"
                name="course_name"
                onChange={handleCourseChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="university" className="text-right">
                University
              </Label>
              <Input
                id="university"
                placeholder="Texas A&M University"
                className="col-span-3"
                name="university_name"
                onChange={handleCourseChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Instructor" className="text-right">
                Instructor
              </Label>
              <Input
                id="instructor"
                placeholder="Pedro Duarte"
                className="col-span-3"
                name="instructor_name"
                onChange={handleCourseChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right">
                Upload Syllabus
              </Label>
              <Input
                id="file"
                type="file"
                accept=".pdf" // Only PDF files are allowed
                className="col-span-3 file-input"
                name="syllabus_file"
                onChange={handleCourseChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Course</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCourse;
