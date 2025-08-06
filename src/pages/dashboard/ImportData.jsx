import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Progress } from '../../components/ui/progress';
import { Badge } from '../../components/ui/badge';
import {
  Upload,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  Download,
  Trash2
} from 'lucide-react';

const ImportData = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
          file.type === 'application/vnd.ms-excel') {
        setSelectedFile(file);
        setUploadError('');
        setUploadComplete(false);
      } else {
        setUploadError('Please select a valid Excel file (.xlsx or .xls)');
        setSelectedFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadProgress(0);
    setUploadError('');

    // Simulate file upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setUploadComplete(true);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadComplete(false);
    setUploadProgress(0);
    setUploadError('');
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Mock import history
  const importHistory = [
    {
      id: 1,
      filename: 'sales_data_2024.xlsx',
      date: '2024-01-15',
      records: 2543,
      status: 'success'
    },
    {
      id: 2,
      filename: 'customer_list.xlsx',
      date: '2024-01-14',
      records: 1892,
      status: 'success'
    },
    {
      id: 3,
      filename: 'inventory_data.xlsx',
      date: '2024-01-12',
      records: 756,
      status: 'error'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Import Excel Data</h1>
        <p className="text-muted-foreground">
          Upload Excel spreadsheets to import data into the system.
        </p>
      </div>

      {/* Upload section */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>File Upload</span>
          </CardTitle>
          <CardDescription>
            Select an Excel file (.xlsx or .xls) to upload. Maximum file size: 10MB.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!selectedFile ? (
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <Label
                htmlFor="file-upload"
                className="cursor-pointer text-primary hover:text-primary-hover font-medium"
              >
                Click to upload Excel file
              </Label>
              <p className="text-sm text-muted-foreground mt-2">
                or drag and drop your file here
              </p>
              <Input
                id="file-upload"
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Selected file info */}
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileSpreadsheet className="w-8 h-8 text-success" />
                  <div>
                    <p className="font-medium">{selectedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(selectedFile.size)}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRemoveFile}
                  disabled={uploading}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Upload progress */}
              {uploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{Math.round(uploadProgress)}%</span>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                </div>
              )}

              {/* Upload complete */}
              {uploadComplete && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    File uploaded successfully! Processing 2,543 records...
                  </AlertDescription>
                </Alert>
              )}

              {/* Upload error */}
              {uploadError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{uploadError}</AlertDescription>
                </Alert>
              )}

              {/* Upload button */}
              <Button
                onClick={handleUpload}
                disabled={uploading || uploadComplete}
                className="w-full"
              >
                {uploading ? 'Uploading...' : uploadComplete ? 'Uploaded' : 'Upload File'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Import guidelines */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Import Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-success mt-0.5" />
              <span>Excel files should have headers in the first row</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-success mt-0.5" />
              <span>Maximum file size is 10MB</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-success mt-0.5" />
              <span>Supported formats: .xlsx, .xls</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-success mt-0.5" />
              <span>Empty rows and columns will be ignored</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Import history */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Import History</CardTitle>
          <CardDescription>
            Recent file imports and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {importHistory.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileSpreadsheet className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{item.filename}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.records} records • {item.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={item.status === 'success' ? 'default' : 'destructive'}>
                    {item.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportData;